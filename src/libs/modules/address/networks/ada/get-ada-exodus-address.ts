import { BaseAddress } from "@emurgo/cardano-serialization-lib-nodejs";

import { getCredential } from "./libs/helpers/helpers.js";

function getAdaExodusAddress(publicKey: string, networkId: number): string {
  const credential = getCredential(publicKey);
  const address = BaseAddress.new(networkId, credential, credential);

  return address.to_address().to_bech32();
}

export { getAdaExodusAddress };
