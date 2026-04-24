import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { HttpAgent } from "@icp-sdk/core/agent";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { createActor, ExternalBlob } from "../backend";
import type { backendInterface } from "../backend";

export interface BackendState {
  actor: backendInterface | null;
  isFetching: boolean;
}

const ACTOR_QUERY_KEY = "actor";

// Passthrough replacements for Caffeine's blob.caffeine.ai storage.
// Bytes go straight to/from the canister as native Motoko Blob.
const uploadFile = async (file: ExternalBlob): Promise<Uint8Array> => {
  return await file.getBytes();
};

const downloadFile = async (bytes: Uint8Array): Promise<ExternalBlob> => {
  return ExternalBlob.fromBytes(bytes);
};

interface AppConfig {
  backend_host?: string;
  backend_canister_id: string;
}

let configCache: AppConfig | null = null;

async function loadConfig(): Promise<AppConfig> {
  if (configCache) return configCache;
  const envBaseUrl = (import.meta.env.BASE_URL as string) || "/";
  const baseUrl = envBaseUrl.endsWith("/") ? envBaseUrl : `${envBaseUrl}/`;
  const response = await fetch(`${baseUrl}env.json`);
  const raw = (await response.json()) as Record<string, string>;
  const id = raw.backend_canister_id;
  if (!id || id === "undefined") {
    throw new Error("backend_canister_id missing from env.json");
  }
  const host =
    raw.backend_host && raw.backend_host !== "undefined"
      ? raw.backend_host
      : undefined;
  configCache = { backend_canister_id: id, backend_host: host };
  return configCache;
}

function extractAgentErrorMessage(error: unknown): string {
  const s = String(error);
  const m = s.match(/with message:\s*'([^']+)'/s);
  return m ? m[1] : s;
}

function processError(e: unknown): never {
  if (e && typeof e === "object" && "message" in e) {
    throw new Error(extractAgentErrorMessage(`${(e as { message: unknown }).message}`));
  }
  throw e as Error;
}

export function useBackend(): BackendState {
  const { identity, isAuthenticated } = useInternetIdentity();
  const queryClient = useQueryClient();

  const actorQuery = useQuery({
    queryKey: [ACTOR_QUERY_KEY, identity?.getPrincipal().toString()],
    queryFn: async () => {
      const config = await loadConfig();
      const agent = new HttpAgent({
        identity: isAuthenticated ? identity : undefined,
        host: config.backend_host,
      });
      if (config.backend_host?.includes("localhost") || config.backend_host?.includes("127.0.0.1")) {
        await agent.fetchRootKey().catch((err) => {
          console.warn("Unable to fetch root key. Check local replica is running.", err);
        });
      }
      return createActor(config.backend_canister_id, uploadFile, downloadFile, {
        agent,
        processError,
      });
    },
    staleTime: Number.POSITIVE_INFINITY,
  });

  useEffect(() => {
    if (actorQuery.data) {
      queryClient.invalidateQueries({
        predicate: (q) => !q.queryKey.includes(ACTOR_QUERY_KEY),
      });
      queryClient.refetchQueries({
        predicate: (q) => !q.queryKey.includes(ACTOR_QUERY_KEY),
      });
    }
  }, [actorQuery.data, queryClient]);

  return {
    actor: actorQuery.data ?? null,
    isFetching: actorQuery.isFetching,
  };
}
