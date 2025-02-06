import { isHexPrefixed, stripHexPrefix } from "ethereumjs-util";

function checkAndRemoveHexPrefix(string: string): string {
  return isHexPrefixed(string) ? stripHexPrefix(string) : string;
}

export { checkAndRemoveHexPrefix };
