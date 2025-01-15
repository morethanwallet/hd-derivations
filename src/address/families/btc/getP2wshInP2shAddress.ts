import { MINIMUM_MULTISIG_ADDRESS_SIGNATURES_AMOUNT } from "@/address/constants/index.js";
import { AddressError, ExceptionMessage } from "@/address/exceptions/index.js";
import { type Address } from "@/address/types/index.js";
import { assert } from "@/helpers/index.js";
import { type KeysConfig } from "@/keys/types/index.js";
import { payments } from "bitcoinjs-lib";

function getP2wshInP2shAddress(publicKey: Uint8Array, keysConfig: KeysConfig): Address["address"] {
  const p2wshRedeem = payments.p2ms({
    m: MINIMUM_MULTISIG_ADDRESS_SIGNATURES_AMOUNT,
    pubkeys: [publicKey],
    network: keysConfig,
  });

  const p2shRedeem = payments.p2wsh({ redeem: p2wshRedeem, network: keysConfig });
  const { address } = payments.p2sh({ redeem: p2shRedeem, network: keysConfig });
  assert(address, AddressError, ExceptionMessage.ADDRESS_GENERATION_FAILED);

  return address;
}

export { getP2wshInP2shAddress };
