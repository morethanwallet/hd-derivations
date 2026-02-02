import { payments } from "bitcoinjs-lib";

import { AddressError } from "../../libs/exceptions/index.js";

import { ExceptionMessage } from "@/libs/modules/address/libs/enums/enums.js";
import { type Address } from "@/libs/modules/address/libs/types/index.js";
import { type CommonKeyPair } from "@/libs/types/types.js";
import { type PrefixConfig } from "@/libs/modules/curves/curves.js";
import { convertHexToBytes } from "@/libs/utils/index.js";

function getTaprootAddress(
  publicKey: CommonKeyPair["publicKey"],
  prefixConfig: PrefixConfig,
): Address["address"] {
  const publicKeyBytes = convertHexToBytes(publicKey);
  const { address } = payments.p2tr({ internalPubkey: publicKeyBytes, network: prefixConfig });

  if (!address) {
    throw new AddressError(ExceptionMessage.ADDRESS_GENERATION_FAILED);
  }

  return address;
}

export { getTaprootAddress };
