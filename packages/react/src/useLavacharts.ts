import { LavaJs, LavaJsOptions } from "@lavacharts/core";

/**
 * useLavacharts Hook
 *
 * This hook function instansiates a new instance of the Lavacharts library
 * as a single instance for your React App
 */
export default function useLavacharts(config: Partial<LavaJsOptions>): LavaJs {
  const lava = new LavaJs(config);

  return lava;
}
