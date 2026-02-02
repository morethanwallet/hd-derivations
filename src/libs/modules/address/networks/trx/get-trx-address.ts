import bs58check from "bs58check";

import { type Address } from "@/libs/modules/address/libs/types/index.js";
import { type CommonKeyPair } from "@/libs/types/types.js";
import { getEvmAddressBuffer } from "@/libs/modules/address/libs/helpers/index.js";

function getTrxAddress(publicKey: CommonKeyPair["publicKey"], prefix: number): Address["address"] {
  const addressPrefixBytes = Buffer.from([prefix]);
  const addressBuffer = getEvmAddressBuffer(publicKey);
  const addressBufferWithPrefix = Buffer.concat([addressPrefixBytes, addressBuffer]);

  return bs58check.encode(addressBufferWithPrefix);
}

export { getTrxAddress };
