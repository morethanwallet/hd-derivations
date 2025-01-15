import { AddressError, ExceptionMessage } from "@/address/exceptions/index.js";
import { type Address } from "@/address/types/index.js";
import { assert } from "@/helpers/index.js";
import { type KeysConfig } from "@/keys/types/index.js";
import { payments } from "bitcoinjs-lib";

function getNativeSegWitAddress(publicKey: Uint8Array, keysConfig: KeysConfig): Address["address"] {
  const { address } = payments.p2wpkh({ network: keysConfig, pubkey: publicKey });
  assert(address, AddressError, ExceptionMessage.ADDRESS_GENERATION_FAILED);

  return address;
}

export { getNativeSegWitAddress };
