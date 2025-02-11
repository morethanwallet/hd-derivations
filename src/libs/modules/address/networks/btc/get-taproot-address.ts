import { ExceptionMessage } from "@/libs/modules/address/libs/enums/index.js";
import { AddressError } from "../../libs/exceptions/index.js";
import { type Address } from "@/libs/modules/address/libs/types/index.js";
import { toUint8Array, toXOnlyPublicKey } from "@/libs/helpers/index.js";
import { type CommonKeyPair } from "@/libs/types/index.js";
import { type PrefixConfig } from "@/libs/modules/keys/index.js";
import { payments } from "bitcoinjs-lib";

function getTaprootAddress(
  publicKey: CommonKeyPair["publicKey"],
  prefixConfig: PrefixConfig,
): Address["address"] {
  const rawPublicKey = toUint8Array(Buffer.from(publicKey, "hex"));
  const xOnlyPublicKey = toXOnlyPublicKey(rawPublicKey);
  const { address } = payments.p2tr({
    internalPubkey: xOnlyPublicKey,
    network: prefixConfig,
  });

  if (!address) throw new AddressError(ExceptionMessage.ADDRESS_GENERATION_FAILED);

  return address;
}

export { getTaprootAddress };
