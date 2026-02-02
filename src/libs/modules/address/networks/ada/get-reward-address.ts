import { RewardAddress } from "@emurgo/cardano-serialization-lib-nodejs";

import { getCredential } from "./libs/helpers/helpers.js";

import { type Address } from "@/libs/modules/address/libs/types/index.js";
import { type CommonKeyPair } from "@/libs/types/types.js";

function getRewardAddress(
  publicKey: CommonKeyPair["publicKey"],
  networkId: number,
): Address["address"] {
  const credential = getCredential(publicKey);
  const address = RewardAddress.new(networkId, credential);

  return address.to_address().to_bech32();
}

export { getRewardAddress };
