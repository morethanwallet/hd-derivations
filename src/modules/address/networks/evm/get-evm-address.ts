import { type Address } from "@/modules/address/libs/types/index.js";
import { type CommonKeyPair } from "@/libs/types/index.js";
import { addHexPrefix, toChecksumAddress } from "ethereumjs-util";
import { getEvmAddressBuffer } from "@/modules/address/libs/helpers/index.js";

function getEvmAddress(publicKey: CommonKeyPair["publicKey"]): Address["address"] {
  const addressBuffer = getEvmAddressBuffer(publicKey);
  const hexAddress = addHexPrefix(addressBuffer.toString("hex"));

  return toChecksumAddress(hexAddress);
}

export { getEvmAddress };
