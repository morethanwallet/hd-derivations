import { AddressError, ExceptionMessage } from "@/address/exceptions/index.js";
import { type Address } from "@/address/types/index.js";
import { assert, toUint8Array } from "@/helpers/index.js";
import { type CommonKeyPair } from "@/types/keys/index.js";
import { type KeysConfig } from "@/keys/types/index.js";
import { payments } from "bitcoinjs-lib";

function getSegWitAddress(
  publicKey: CommonKeyPair["publicKey"],
  keysConfig: KeysConfig
): Address["address"] {
  const rawPublicKey = toUint8Array(Buffer.from(publicKey, "hex"));
  const redeem = payments.p2wpkh({ pubkey: rawPublicKey, network: keysConfig });
  const { address } = payments.p2sh({ redeem, network: keysConfig });
  assert(address, AddressError, ExceptionMessage.ADDRESS_GENERATION_FAILED);

  return address;
}

export { getSegWitAddress };
