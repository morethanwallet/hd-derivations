import { type Address } from "@/address/types/index.js";
import { toUint8Array } from "@/helpers/index.js";
import { type CommonKeyPair } from "@/keyDerivation/types/index.js";
import { type AvaxDerivationTypeUnion } from "@/types/index.js";
import { utils } from "@avalabs/avalanchejs";
import { crypto } from "bitcoinjs-lib";

const derivationTypeToPrefix: Record<AvaxDerivationTypeUnion, string> = {
  avaxX: "X-",
  avaxP: "P-",
};

function getAvaxAddress(
  publicKey: CommonKeyPair["publicKey"],
  derivationType: AvaxDerivationTypeUnion,
  prefix: string
): Address["address"] {
  const rawPublicKey = toUint8Array(Buffer.from(publicKey, "hex"));
  const address: string = utils.formatBech32(prefix, crypto.hash160(rawPublicKey));

  return derivationTypeToPrefix[derivationType].concat(address);
}

export { getAvaxAddress };
