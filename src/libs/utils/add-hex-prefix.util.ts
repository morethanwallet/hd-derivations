import { HEX_PREFIX } from "../constants/index.js";
import { isHexPrefixed } from "./is-hex-prefixed.util.js";

function addHexPrefix(string: string): string {
  return isHexPrefixed(string) ? string : HEX_PREFIX.concat(string);
}

export { addHexPrefix };
