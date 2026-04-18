import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";

export interface IdentityState {
  principal: Principal | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  isLoggingIn: boolean;
  login: () => void;
  logout: () => void;
}

/**
 * Wraps useInternetIdentity with a cleaner API aligned to project needs.
 * - login() / logout() are fire-and-forget (never await).
 * - principal is derived from identity.getPrincipal() when authenticated.
 */
export function useIdentity(): IdentityState {
  const {
    identity,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    login,
    clear,
  } = useInternetIdentity();

  const principal: Principal | null =
    isAuthenticated && identity ? identity.getPrincipal() : null;

  return {
    principal,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    login,
    logout: clear,
  };
}
