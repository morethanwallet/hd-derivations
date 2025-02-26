import { isHexPrefixed } from "./is-hex-prefixed.util.js";
import { removeHexPrefix } from "./remove-hex-prefix.util.js";

function checkAndRemoveHexPrefix(string: string): string {
  return isHexPrefixed(string) ? removeHexPrefix(string) : string;
}

export { checkAndRemoveHexPrefix };
