import { type Address } from "@/libs/modules/address/libs/types/index.js";
import { type CommonKeyPair } from "@/libs/types/types.js";
import { toChecksumAddress } from "ethereumjs-util";
import { getEvmAddressBuffer } from "@/libs/modules/address/libs/helpers/index.js";
import { addHexPrefix } from "@/libs/utils/index.js";

function getEvmAddress(publicKey: CommonKeyPair["publicKey"]): Address["address"] {
  const addressBuffer = getEvmAddressBuffer(publicKey);
  const hexAddress = addHexPrefix(addressBuffer.toString("hex"));

  return toChecksumAddress(hexAddress);
}

export { getEvmAddress };
