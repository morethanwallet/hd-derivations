import { ExceptionMessage } from "@/modules/address/libs/enums/index.js";
import { AddressError } from "@/libs/exceptions/index.js";
import { type Address } from "@/modules/address/libs/types/index.js";
import { assert, toUint8Array } from "@/libs/helpers/index.js";
import { type CommonKeyPair } from "@/libs/types/index.js";
import { type PrefixConfig } from "@/libs/modules/keys/index.js";
import { payments } from "bitcoinjs-lib";

function getLegacyAddress(
  publicKey: CommonKeyPair["publicKey"],
  prefixConfig: PrefixConfig
): Address["address"] {
  const rawPublicKey = toUint8Array(Buffer.from(publicKey, "hex"));
  const { address } = payments.p2pkh({ network: prefixConfig, pubkey: rawPublicKey });
  assert(address, AddressError, ExceptionMessage.ADDRESS_GENERATION_FAILED);

  return address;
}

export { getLegacyAddress };
