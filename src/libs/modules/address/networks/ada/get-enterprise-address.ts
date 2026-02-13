import { address } from "@stricahq/typhonjs";

import { getCredential } from "./libs/helpers/helpers.js";

import { type Address } from "@/libs/modules/address/libs/types/index.js";
import { type CommonKeyPair } from "@/libs/types/types.js";

function getEnterpriseAddress(
  publicKey: CommonKeyPair["publicKey"],
  networkId: number,
): Address["address"] {
  const credential = getCredential(publicKey);
  const enterpriseAddress = new address.EnterpriseAddress(networkId, credential);

  return enterpriseAddress.getBech32();
}

export { getEnterpriseAddress };
