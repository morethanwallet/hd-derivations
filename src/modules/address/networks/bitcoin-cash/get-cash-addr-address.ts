import { ExceptionMessage } from "@/modules/address/libs/enums/index.js";
import { AddressError } from "@/libs/exceptions/index.js";
import { type Address } from "@/modules/address/libs/types/index.js";
import { assert } from "@/libs/helpers/index.js";
import { type PrefixConfig } from "@/libs/modules/keys/index.js";
import { toCashAddress } from "bchaddrjs";
import { payments } from "bitcoinjs-lib";

const REGTEST_PREFIX = "bchreg";
const HRP_DELIMITER = ":";
const ADDRESS_INDEX = 1;

function getCashAddrAddress(publicKey: Uint8Array, prefixConfig: PrefixConfig): Address["address"] {
  const { address } = payments.p2pkh({
    network: prefixConfig,
    pubkey: publicKey,
  });
  assert(address, AddressError, ExceptionMessage.ADDRESS_GENERATION_FAILED);
  const formattedAddress = toCashAddress(address);

  if (prefixConfig.bech32 === "bc") {
    return REGTEST_PREFIX.concat(
      HRP_DELIMITER,
      String(formattedAddress.split(HRP_DELIMITER)[ADDRESS_INDEX]),
    );
  }

  return formattedAddress;
}

export { getCashAddrAddress };
