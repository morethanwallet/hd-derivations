import { ExceptionMessage } from "@/address/enums/index.js";
import { AddressError } from "@/exceptions/index.js";
import { type Address } from "@/address/types/index.js";
// import { bitcoinFamilyConfig } from "@/config/families/index.js";
import { assert } from "@/helpers/index.js";
import { type KeysConfig } from "@/keys/types/index.js";
import { toCashAddress } from "bchaddrjs";
import { payments } from "bitcoinjs-lib";

const REGTEST_PREFIX = "bchreg";
const HRP_DELIMITER = ":";
const ADDRESS_INDEX = 1;

function getCashAddrAddress(publicKey: Uint8Array, keysConfig: KeysConfig): Address["address"] {
  const { address } = payments.p2pkh({ network: keysConfig, pubkey: publicKey });
  assert(address, AddressError, ExceptionMessage.ADDRESS_GENERATION_FAILED);
  const formattedAddress = toCashAddress(address);

  if (keysConfig.bech32 === "bc") {
    return REGTEST_PREFIX.concat(
      HRP_DELIMITER,
      String(formattedAddress.split(HRP_DELIMITER)[ADDRESS_INDEX])
    );
  }

  return formattedAddress;
}

export { getCashAddrAddress };
