import {
  EnterpriseAddress,
  PublicKey,
} from "@emurgo/cardano-serialization-lib-nodejs";
import { getCredential } from "./libs/helpers/index.js";
import { type Address } from "@/modules/address/libs/types/index.js";
import { type CommonKeyPair } from "@/libs/types/index.js";

function getEnterpriseAddress(
  publicKey: CommonKeyPair["publicKey"],
  networkId: number,
): Address["address"] {
  const rawPublicKey = PublicKey.from_hex(publicKey);
  const credential = getCredential(rawPublicKey);
  const address = EnterpriseAddress.new(networkId, credential);

  return address.to_address().to_bech32();
}

export { getEnterpriseAddress };
