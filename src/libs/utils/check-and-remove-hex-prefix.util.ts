import { stripHexPrefix } from "ethereumjs-util";
import { isHexPrefixed } from "./index.js";

function checkAndRemoveHexPrefix(string: string): string {
  return isHexPrefixed(string) ? stripHexPrefix(string) : string;
}

export { checkAndRemoveHexPrefix };
