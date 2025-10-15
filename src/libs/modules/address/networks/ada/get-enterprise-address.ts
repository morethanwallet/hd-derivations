import { EnterpriseAddress } from "@emurgo/cardano-serialization-lib-nodejs";
import { getCredential } from "./libs/helpers/index.js";
import { type Address } from "@/libs/modules/address/libs/types/index.js";
import { type CommonKeyPair } from "@/libs/types/types.js";

function getEnterpriseAddress(
  publicKey: CommonKeyPair["publicKey"],
  networkId: number,
): Address["address"] {
  const credential = getCredential(publicKey);
  const address = EnterpriseAddress.new(networkId, credential);

  return address.to_address().to_bech32();
}

export { getEnterpriseAddress };
