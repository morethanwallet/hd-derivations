import { MINIMUM_MULTISIG_ADDRESS_SIGNATURES_AMOUNT } from "@/address/constants/index.js";
import { AddressError, ExceptionMessage } from "@/address/exceptions/index.js";
import { type Address } from "@/address/types/index.js";
import { assert, toUint8Array } from "@/helpers/index.js";
import { type CommonKeyPair } from "@/keyDerivation/types/index.js";
import { type KeysConfig } from "@/keys/types/index.js";
import { payments } from "bitcoinjs-lib";

function getP2wshInP2shAddress(
  publicKey: CommonKeyPair["publicKey"],
  keysConfig: KeysConfig
): Address["address"] {
  const rawPublicKey = toUint8Array(Buffer.from(publicKey, "hex"));
  const p2wshRedeem = payments.p2ms({
    m: MINIMUM_MULTISIG_ADDRESS_SIGNATURES_AMOUNT,
    pubkeys: [rawPublicKey],
    network: keysConfig,
  });

  const p2shRedeem = payments.p2wsh({ redeem: p2wshRedeem, network: keysConfig });
  const { address } = payments.p2sh({ redeem: p2shRedeem, network: keysConfig });
  assert(address, AddressError, ExceptionMessage.ADDRESS_GENERATION_FAILED);

  return address;
}

export { getP2wshInP2shAddress };
