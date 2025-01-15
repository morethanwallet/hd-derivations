import { BaseAddress, PublicKey } from "@emurgo/cardano-serialization-lib-nodejs";
import { getCredential } from "./helpers/index.js";
import { type Address } from "@/address/types/index.js";

function getBaseAddress(
  enterprisePublicKey: string,
  rewardPublicKey: string,
  networkId: number
): Address["address"] {
  const enterpriseCredential = getCredential(PublicKey.from_hex(enterprisePublicKey));
  const rewardCredential = getCredential(PublicKey.from_hex(rewardPublicKey));
  const address = BaseAddress.new(networkId, enterpriseCredential, rewardCredential);

  return address.to_address().to_bech32();
}

export { getBaseAddress };
