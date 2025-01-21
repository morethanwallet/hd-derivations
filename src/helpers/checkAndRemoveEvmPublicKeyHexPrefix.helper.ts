import { type CommonKeyPair } from "@/types/keys/index.js";
import { isHexPrefixed, stripHexPrefix } from "ethereumjs-util";

function checkAndRemoveEvmPublicKeyHexPrefix(
  publicKey: CommonKeyPair["publicKey"]
): CommonKeyPair["publicKey"] {
  return isHexPrefixed(publicKey) ? stripHexPrefix(publicKey) : publicKey;
}

export { checkAndRemoveEvmPublicKeyHexPrefix };
