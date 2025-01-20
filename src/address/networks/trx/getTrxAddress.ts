import { type Address } from "@/address/types/index.js";
import { type CommonKeyPair } from "@/keyDerivation/types/index.js";
import { getEvmAddressBuffer } from "../helpers/index.js";
import bs58check from "bs58check";
import { toUint8Array } from "@/helpers/index.js";

function getTrxAddress(publicKey: CommonKeyPair["publicKey"]): Address["address"] {
  const addressPrefix = 0x41;
  const addressPrefixBytes = toUint8Array(Buffer.from([addressPrefix]));
  const addressBytes = toUint8Array(getEvmAddressBuffer(publicKey));
  const addressBufferWithPrefix = Buffer.concat([addressPrefixBytes, addressBytes]);

  return bs58check.encode(addressBufferWithPrefix);
}

export { getTrxAddress };
