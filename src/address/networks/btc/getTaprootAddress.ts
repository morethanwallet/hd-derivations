import { AddressError, ExceptionMessage } from "@/address/exceptions/index.js";
import { type Address } from "@/address/types/index.js";
import { assert, toUint8Array, toXOnlyPublicKey } from "@/helpers/index.js";
import { type CommonKeyPair } from "@/keyDerivation/types/index.js";
import { type KeysConfig } from "@/keys/types/index.js";
import { payments } from "bitcoinjs-lib";

function getTaprootAddress(
  publicKey: CommonKeyPair["publicKey"],
  keysConfig: KeysConfig
): Address["address"] {
  const rawPublicKey = toUint8Array(Buffer.from(publicKey, "hex"));
  const xOnlyPublicKey = toXOnlyPublicKey(rawPublicKey);
  const { address } = payments.p2tr({ internalPubkey: xOnlyPublicKey, network: keysConfig });
  assert(address, AddressError, ExceptionMessage.ADDRESS_GENERATION_FAILED);

  return address;
}

export { getTaprootAddress };
