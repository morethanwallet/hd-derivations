import { ExceptionMessage } from "@/libs/modules/address/libs/enums/index.js";
import { AddressError } from "../../libs/exceptions/index.js";
import { type Address } from "@/libs/modules/address/libs/types/index.js";
import { type CommonKeyPair } from "@/libs/types/types.js";
import { type PrefixConfig } from "@/libs/modules/curves/curves.js";
import { payments } from "bitcoinjs-lib";
import { convertHexToBytes } from "@/libs/utils/index.js";

function getBtcSegWitAddress(
  publicKey: CommonKeyPair["publicKey"],
  prefixConfig: PrefixConfig,
): Address["address"] {
  const rawPublicKey = convertHexToBytes(publicKey);

  const redeem = payments.p2wpkh({
    pubkey: rawPublicKey,
    network: prefixConfig,
  });

  const { address } = payments.p2sh({ redeem, network: prefixConfig });

  if (!address) throw new AddressError(ExceptionMessage.ADDRESS_GENERATION_FAILED);

  return address;
}

export { getBtcSegWitAddress };
