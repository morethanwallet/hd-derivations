import { ExceptionMessage } from "@/libs/modules/address/libs/enums/index.js";
import { AddressError } from "@/libs/exceptions/index.js";
import { type Address } from "@/libs/modules/address/libs/types/index.js";
import { assert, toUint8Array } from "@/libs/helpers/index.js";
import { type PrefixConfig } from "@/libs/modules/keys/index.js";
import { toCashAddress } from "bchaddrjs";
import { payments } from "bitcoinjs-lib";
import type { CommonKeyPair } from "@/libs/types/index.js";

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
  const rawPublicKey = toUint8Array(Buffer.from(publicKey, "hex"));

  const { address } = payments.p2pkh({
    network: prefixConfig,
    pubkey: rawPublicKey,
  });
  assert(address, AddressError, ExceptionMessage.ADDRESS_GENERATION_FAILED);
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
