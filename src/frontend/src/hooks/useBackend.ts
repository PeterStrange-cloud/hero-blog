import { useActor } from "@caffeineai/core-infrastructure";
import { createActor } from "../backend";
import type { backendInterface } from "../backend";

export interface BackendState {
  actor: backendInterface | null;
  isFetching: boolean;
}

/**
 * Returns a typed backend actor instance.
 * - actor is null while loading or when identity changes.
 * - All backend calls must check actor != null before calling.
 */
export function useBackend(): BackendState {
  const { actor, isFetching } = useActor(createActor);
  return { actor, isFetching };
}
