import { AddressError, ExceptionMessage } from "@/address/exceptions/index.js";
import { type Address } from "@/address/types/index.js";
import { assert, toXOnlyPublicKey } from "@/helpers/index.js";
import { type KeysConfig } from "@/keys/types/index.js";
import { payments } from "bitcoinjs-lib";

function getTaprootAddress(publicKey: Uint8Array, keysConfig: KeysConfig): Address["address"] {
  const xOnlyPublicKey = toXOnlyPublicKey(publicKey);
  const { address } = payments.p2tr({ internalPubkey: xOnlyPublicKey, network: keysConfig });
  assert(address, AddressError, ExceptionMessage.ADDRESS_GENERATION_FAILED);

  return address;
}

export { getTaprootAddress };
