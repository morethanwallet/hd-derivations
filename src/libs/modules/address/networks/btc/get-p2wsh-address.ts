import { MINIMUM_MULTISIG_ADDRESS_SIGNATURES_AMOUNT } from "@/libs/constants/index.js";
import { ExceptionMessage } from "@/libs/modules/address/libs/enums/index.js";
import { type Address } from "@/libs/modules/address/libs/types/index.js";
import { toUint8Array } from "@/libs/helpers/index.js";
import { type CommonKeyPair } from "@/libs/types/index.js";
import { type PrefixConfig } from "@/libs/modules/keys/index.js";
import { payments } from "bitcoinjs-lib";
import { AddressError } from "../../libs/exceptions/index.js";

function getP2wshAddress(
  publicKey: CommonKeyPair["publicKey"],
  prefixConfig: PrefixConfig,
): Address["address"] {
  const rawPublicKey = toUint8Array(Buffer.from(publicKey, "hex"));
  const redeem = payments.p2ms({
    m: MINIMUM_MULTISIG_ADDRESS_SIGNATURES_AMOUNT,
    pubkeys: [rawPublicKey],
    network: prefixConfig,
  });

  const { address } = payments.p2wsh({ redeem, network: prefixConfig });

  if (!address) throw new AddressError(ExceptionMessage.ADDRESS_GENERATION_FAILED);

  return address;
}

export { getP2wshAddress };
