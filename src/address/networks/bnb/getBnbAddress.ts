import { type Address } from "@/address/types/index.js";
import { type CommonKeyPair } from "@/types/keys/index.js";
import { getAddressFromPrivateKey } from "@binance-chain/javascript-sdk/lib/crypto/index.js";

const HRP = "bnb";

function getBnbAddress(privateKey: CommonKeyPair["privateKey"]): Address["address"] {
  return getAddressFromPrivateKey(privateKey, HRP);
}

export { getBnbAddress };
