import { PublicKey, RewardAddress } from "@emurgo/cardano-serialization-lib-nodejs";
import { getCredential } from "./helpers/index.js";
import { type Address } from "@/address/types/index.js";

function getRewardAddress(publicKey: PublicKey, networkId: number): Address["address"] {
  const credential = getCredential(publicKey);
  const address = RewardAddress.new(networkId, credential);

  return address.to_address().to_bech32();
}

export { getRewardAddress };
