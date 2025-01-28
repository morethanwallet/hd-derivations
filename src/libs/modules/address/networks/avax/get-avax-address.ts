import { type Address } from "@/libs/modules/address/libs/types/index.js";
import { toUint8Array } from "@/libs/helpers/index.js";
import { type CommonKeyPair, type AvaxDerivationTypeUnion } from "@/libs/types/index.js";
import { bech32 } from "bech32";
import { crypto } from "bitcoinjs-lib";

const derivationTypeToPrefix: Record<AvaxDerivationTypeUnion, string> = {
  avaxX: "X-",
  avaxP: "P-",
};

function getAvaxAddress(
  publicKey: CommonKeyPair["publicKey"],
  derivationType: AvaxDerivationTypeUnion,
  prefix: string,
): Address["address"] {
  const rawPublicKey = toUint8Array(Buffer.from(publicKey, "hex"));
  const addressBytes = crypto.hash160(rawPublicKey);
  const words = bech32.toWords(addressBytes);
  const address = bech32.encode(prefix, words);

  return derivationTypeToPrefix[derivationType].concat(address);
}

export { getAvaxAddress };
