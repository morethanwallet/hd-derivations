import { type Address } from "@/libs/modules/address/libs/types/index.js";
import { type CommonKeyPair } from "@/libs/types/types.js";
import { getAddressFromPublicKey } from "@binance-chain/javascript-sdk/lib/crypto/index.js";

const HRP = "bnb";

function getBnbAddress(publicKey: CommonKeyPair["publicKey"]): Address["address"] {
  return getAddressFromPublicKey(publicKey, HRP);
}

export { getBnbAddress };
