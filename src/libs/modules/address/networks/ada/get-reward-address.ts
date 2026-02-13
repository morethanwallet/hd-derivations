import { address } from "@stricahq/typhonjs";

import { getCredential } from "./libs/helpers/helpers.js";

import { type Address } from "@/libs/modules/address/libs/types/index.js";
import { type CommonKeyPair } from "@/libs/types/types.js";

function getRewardAddress(
  publicKey: CommonKeyPair["publicKey"],
  networkId: number,
): Address["address"] {
  const credential = getCredential(publicKey);
  const rewardAddress = new address.RewardAddress(networkId, credential);

  return rewardAddress.getBech32();
}

export { getRewardAddress };
