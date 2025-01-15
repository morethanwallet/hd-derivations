import { MINIMUM_MULTISIG_ADDRESS_SIGNATURES_AMOUNT } from "@/address/constants/index.js";
import { AddressError, ExceptionMessage } from "@/address/exceptions/index.js";
import { type Address } from "@/address/types/index.js";
import { assert } from "@/helpers/index.js";
import { type KeysConfig } from "@/keys/types/index.js";
import { payments } from "bitcoinjs-lib";

function getP2wshAddress(publicKey: Uint8Array, keysConfig: KeysConfig): Address["address"] {
  const redeem = payments.p2ms({
    m: MINIMUM_MULTISIG_ADDRESS_SIGNATURES_AMOUNT,
    pubkeys: [publicKey],
    network: keysConfig,
  });

  const { address } = payments.p2wsh({ redeem, network: keysConfig });
  assert(address, AddressError, ExceptionMessage.ADDRESS_GENERATION_FAILED);

  return address;
}

export { getP2wshAddress };
