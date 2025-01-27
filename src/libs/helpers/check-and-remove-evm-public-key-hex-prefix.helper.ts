import { type CommonKeyPair } from "@/libs/types/index.js";
import { isHexPrefixed, stripHexPrefix } from "ethereumjs-util";

function checkAndRemoveEvmPublicKeyHexPrefix(
  publicKey: CommonKeyPair["publicKey"],
): CommonKeyPair["publicKey"] {
  return isHexPrefixed(publicKey) ? stripHexPrefix(publicKey) : publicKey;
}

export { checkAndRemoveEvmPublicKeyHexPrefix };
