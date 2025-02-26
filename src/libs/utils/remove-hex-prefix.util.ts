import { isHexPrefixed } from "./is-hex-prefixed.util.js";

const HEX_PREFIX_END_INDEX = 2;

function removeHexPrefix(string: string): string {
  return isHexPrefixed(string) ? string.slice(HEX_PREFIX_END_INDEX) : string;
}

export { removeHexPrefix };
