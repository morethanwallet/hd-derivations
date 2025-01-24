import { type Address } from "@/modules/address/libs/types/index.js";
import { type CommonKeyPair } from "@/libs/types/index.js";
import { getEvmAddressBuffer } from "@/modules/address/libs/helpers/index.js";
import bs58check from "bs58check";

function getTrxAddress(
  publicKey: CommonKeyPair["publicKey"],
  prefix: number,
): Address["address"] {
  const addressPrefixBytes = Buffer.from([prefix]);
  const addressBytes = getEvmAddressBuffer(publicKey);
  const addressBufferWithPrefix = Buffer.concat([
    addressPrefixBytes,
    addressBytes,
  ]);

  return bs58check.encode(addressBufferWithPrefix);
}

export { getTrxAddress };
