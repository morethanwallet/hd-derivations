import { HEX_PREFIX } from "../constants/index.js";

function isHexPrefixed(string: string): boolean {
  return string.startsWith(HEX_PREFIX);
}

export { isHexPrefixed };
