import { type Address } from "@/libs/modules/address/libs/types/index.js";
import { toUint8Array } from "@/libs/helpers/index.js";
import { type CommonKeyPair } from "@/libs/types/index.js";
import { bech32 } from "bech32";
import { crypto } from "bitcoinjs-lib";

type Parameters = {
  publicKey: CommonKeyPair["publicKey"];
  hrp: string;
  prefix: string;
};

function getAvaxAddress({ publicKey, hrp, prefix }: Parameters): Address["address"] {
  const rawPublicKey = toUint8Array(Buffer.from(publicKey, "hex"));
  const addressBytes = crypto.hash160(rawPublicKey);
  const words = bech32.toWords(addressBytes);
  const address = bech32.encode(hrp, words);

  return prefix.concat(address);
}

export { getAvaxAddress };
