import { ExceptionMessage } from "@/libs/modules/address/libs/enums/enums.js";
import { AddressError } from "@/libs/modules/address/libs/exceptions/index.js";
import { type Address } from "@/libs/modules/address/libs/types/index.js";
import { type PrefixConfig } from "@/libs/modules/curves/curves.js";
import { toCashAddress } from "bchaddrjs";
import { payments } from "bitcoinjs-lib";
import type { CommonKeyPair } from "@/libs/types/types.js";
import { convertHexToBytes } from "@/libs/utils/index.js";

const REGTEST_PREFIX = "bchreg";
const HRP_DELIMITER = ":";
const ADDRESS_INDEX = 1;

type GetCashAddrAddress = {
  publicKey: CommonKeyPair["publicKey"];
  prefixConfig: PrefixConfig;
  isRegtest: boolean;
};

function getCashAddrAddress({
  isRegtest,
  prefixConfig,
  publicKey,
}: GetCashAddrAddress): Address["address"] {
  const rawPublicKey = convertHexToBytes(publicKey);

  const { address } = payments.p2pkh({
    network: prefixConfig,
    pubkey: rawPublicKey,
  });

  if (!address) throw new AddressError(ExceptionMessage.ADDRESS_GENERATION_FAILED);

  const formattedAddress = toCashAddress(address);

  if (isRegtest) {
    return REGTEST_PREFIX.concat(
      HRP_DELIMITER,
      String(formattedAddress.split(HRP_DELIMITER)[ADDRESS_INDEX]),
    );
  }

  return formattedAddress;
}

export { getCashAddrAddress };
