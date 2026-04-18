/**
 * useWallet — Plug Wallet & Bitfinity detection and connection.
 *
 * Wallet transfer is best-effort: we attempt to use each wallet's
 * ICRC-1 transfer API. If unavailable, the user falls back to manual.
 */

import { useCallback, useState } from "react";

export type WalletName = "Plug" | "Bitfinity";

export interface WalletState {
  /** Which wallet extensions are available in this browser */
  available: WalletName[];
  /** Currently connected wallet, if any */
  connected: WalletName | null;
  /** Principal text of the connected wallet account */
  connectedPrincipal: string | null;
  isConnecting: boolean;
  connectionError: string | null;
  connect: (wallet: WalletName) => Promise<void>;
  disconnect: () => void;
  /** Attempt ICRC-1 transfer via the connected wallet. Returns a tx block index or null. */
  transferICRC1: (params: TransferParams) => Promise<bigint | null>;
}

export interface TransferParams {
  canisterId: string;
  toOwner: string;
  toSubaccount: Uint8Array;
  amountE8s: bigint;
  memo?: bigint;
}

const HERO_CANISTER_ID = "zm3la-fqaaa-aaaaa-qg2ma-cai";
const ICP_HOST = "https://icp0.io";

// ─── Browser extension sniffing ──────────────────────────────────────────────

function isPlugAvailable(): boolean {
  return (
    typeof window !== "undefined" &&
    // biome-ignore lint/suspicious/noExplicitAny: browser extension
    (window as any).ic?.plug !== undefined
  );
}

function isBitfinityAvailable(): boolean {
  return (
    typeof window !== "undefined" &&
    // biome-ignore lint/suspicious/noExplicitAny: browser extension
    (window as any).bitfinity !== undefined
  );
}

function getAvailable(): WalletName[] {
  const out: WalletName[] = [];
  if (isPlugAvailable()) out.push("Plug");
  if (isBitfinityAvailable()) out.push("Bitfinity");
  return out;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useWallet(): WalletState {
  const [connected, setConnected] = useState<WalletName | null>(null);
  const [connectedPrincipal, setConnectedPrincipal] = useState<string | null>(
    null,
  );
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const connect = useCallback(async (wallet: WalletName) => {
    setIsConnecting(true);
    setConnectionError(null);
    try {
      if (wallet === "Plug") {
        // biome-ignore lint/suspicious/noExplicitAny: browser extension
        const plug = (window as any).ic.plug;
        const connected = await plug.isConnected();
        if (!connected) {
          await plug.requestConnect({
            whitelist: [HERO_CANISTER_ID],
            host: ICP_HOST,
          });
        }
        const principal: string = await plug.agent
          .getPrincipal()
          .then((p: { toText: () => string }) => p.toText())
          .catch(() => "unknown");
        setConnected("Plug");
        setConnectedPrincipal(principal);
      } else if (wallet === "Bitfinity") {
        // biome-ignore lint/suspicious/noExplicitAny: browser extension
        const bf = (window as any).bitfinity;
        await bf.requestConnect({ whitelist: [HERO_CANISTER_ID] });
        const principal: string = await bf
          .getPrincipal()
          .then((p: { toText: () => string }) => p.toText())
          .catch(() => "unknown");
        setConnected("Bitfinity");
        setConnectedPrincipal(principal);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to connect wallet.";
      setConnectionError(msg);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setConnected(null);
    setConnectedPrincipal(null);
    setConnectionError(null);
  }, []);

  const transferICRC1 = useCallback(
    async (params: TransferParams): Promise<bigint | null> => {
      const { toOwner, toSubaccount, amountE8s } = params;

      if (connected === "Bitfinity") {
        // Bitfinity exposes a direct icrc1Transfer method
        // biome-ignore lint/suspicious/noExplicitAny: browser extension
        const bf = (window as any).bitfinity;
        if (typeof bf.icrc1Transfer !== "function") return null;

        const result = await bf.icrc1Transfer({
          canisterId: HERO_CANISTER_ID,
          to: {
            owner: toOwner,
            subaccount: [Array.from(toSubaccount)],
          },
          amount: amountE8s,
          fee: [BigInt(10_000)],
          memo: [],
          created_at_time: [],
        });
        // result is typically { Ok: blockIndex } or { Err: ... }
        if (result?.Ok !== undefined) return BigInt(result.Ok);
        return null;
      }

      if (connected === "Plug") {
        // Plug doesn't have a native ICRC-1 transfer method.
        // We use createActor to get a handle on the HERO ledger and call
        // icrc1_transfer directly via Plug's agent.
        // biome-ignore lint/suspicious/noExplicitAny: browser extension
        const plug = (window as any).ic.plug;
        if (typeof plug.createActor !== "function") return null;

        // Minimal IDL for icrc1_transfer — enough to call the method
        // biome-ignore lint/suspicious/noExplicitAny: candid factory
        const idlFactory = ({ IDL }: any) => {
          const Account = IDL.Record({
            owner: IDL.Principal,
            subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
          });
          const TransferArg = IDL.Record({
            to: Account,
            fee: IDL.Opt(IDL.Nat),
            memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
            from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
            created_at_time: IDL.Opt(IDL.Nat64),
            amount: IDL.Nat,
          });
          const TransferResult = IDL.Variant({
            Ok: IDL.Nat,
            Err: IDL.Text,
          });
          return IDL.Service({
            icrc1_transfer: IDL.Func([TransferArg], [TransferResult], []),
          });
        };

        const actor = await plug.createActor({
          canisterId: HERO_CANISTER_ID,
          interfaceFactory: idlFactory,
        });

        const { Principal } = await import("@dfinity/principal");
        const result = await actor.icrc1_transfer({
          to: {
            owner: Principal.fromText(toOwner),
            subaccount: [Array.from(toSubaccount)],
          },
          fee: [BigInt(10_000)],
          memo: [],
          from_subaccount: [],
          created_at_time: [],
          amount: amountE8s,
        });

        if (result?.Ok !== undefined) return BigInt(result.Ok);
        return null;
      }

      return null;
    },
    [connected],
  );

  return {
    available: getAvailable(),
    connected,
    connectedPrincipal,
    isConnecting,
    connectionError,
    connect,
    disconnect,
    transferICRC1,
  };
}
