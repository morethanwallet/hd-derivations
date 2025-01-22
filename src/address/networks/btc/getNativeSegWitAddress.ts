import { ExceptionMessage } from "@/address/enums/index.js";
import { AddressError } from "@/exceptions/index.js";
import { type Address } from "@/address/types/index.js";
import { assert, toUint8Array } from "@/helpers/index.js";
import { type CommonKeyPair } from "@/types/keys/index.js";
import { type KeysConfig } from "@/keys/types/index.js";
import { payments } from "bitcoinjs-lib";

function getNativeSegWitAddress(
  publicKey: CommonKeyPair["publicKey"],
  keysConfig: KeysConfig
): Address["address"] {
  const rawPublicKey = toUint8Array(Buffer.from(publicKey, "hex"));
  const { address } = payments.p2wpkh({ network: keysConfig, pubkey: rawPublicKey });
  assert(address, AddressError, ExceptionMessage.ADDRESS_GENERATION_FAILED);

  return address;
}

export { getNativeSegWitAddress };
