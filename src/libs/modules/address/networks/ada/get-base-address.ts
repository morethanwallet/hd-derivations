import { address } from "@stricahq/typhonjs";

import { getCredential } from "./libs/helpers/helpers.js";

import { type Address } from "@/libs/modules/address/libs/types/index.js";
import { type AdaBaseKeyPair } from "@/libs/types/types.js";

function getBaseAddress(
  enterprisePublicKey: AdaBaseKeyPair["enterprisePublicKey"],
  rewardPublicKey: AdaBaseKeyPair["rewardPublicKey"],
  networkId: number,
): Address["address"] {
  const enterpriseCredential = getCredential(enterprisePublicKey);
  const rewardCredential = getCredential(rewardPublicKey);

  const baseAddress = new address.BaseAddress(networkId, enterpriseCredential, rewardCredential);

  return baseAddress.getBech32();
}

export { getBaseAddress };
