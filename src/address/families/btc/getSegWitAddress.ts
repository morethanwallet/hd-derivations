import { AddressError, ExceptionMessage } from "@/address/exceptions/index.js";
import { type Address } from "@/address/types/index.js";
import { assert } from "@/helpers/index.js";
import { type KeysConfig } from "@/keys/types/index.js";
import { payments } from "bitcoinjs-lib";

function getSegWitAddress(publicKey: Uint8Array, keysConfig: KeysConfig): Address["address"] {
  const redeem = payments.p2wpkh({ pubkey: publicKey, network: keysConfig });
  const { address } = payments.p2sh({ redeem, network: keysConfig });
  assert(address, AddressError, ExceptionMessage.ADDRESS_GENERATION_FAILED);

  return address;
}

export { getSegWitAddress };
