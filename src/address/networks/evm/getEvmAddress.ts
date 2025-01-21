import { type Address } from "@/address/types/index.js";
import { type CommonKeyPair } from "@/types/keys/index.js";
import { addHexPrefix, toChecksumAddress } from "ethereumjs-util";
import { getEvmAddressBuffer } from "../helpers/index.js";

function getEvmAddress(publicKey: CommonKeyPair["publicKey"]): Address["address"] {
  const addressBuffer = getEvmAddressBuffer(publicKey);
  const hexAddress = addHexPrefix(addressBuffer.toString("hex"));

  return toChecksumAddress(hexAddress);
}

export { getEvmAddress };
