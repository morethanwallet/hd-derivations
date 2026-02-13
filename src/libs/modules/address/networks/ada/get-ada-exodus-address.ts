import { address } from "@stricahq/typhonjs";

import { getCredential } from "./libs/helpers/helpers.js";

function getAdaExodusAddress(publicKey: string, networkId: number): string {
  const credential = getCredential(publicKey);
  const baseAddress = new address.BaseAddress(networkId, credential, credential);

  return baseAddress.getBech32();
}

export { getAdaExodusAddress };
