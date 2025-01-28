import { BaseAddress, PublicKey } from "@emurgo/cardano-serialization-lib-nodejs";
import { getCredential } from "./libs/helpers/index.js";
import { type Address } from "@/libs/modules/address/libs/types/index.js";
import { type CardanoBaseKeyPair } from "@/libs/types/index.js";

function getBaseAddress(
  enterprisePublicKey: CardanoBaseKeyPair["enterprisePublicKey"],
  rewardPublicKey: CardanoBaseKeyPair["rewardPublicKey"],
  networkId: number,
): Address["address"] {
  const enterpriseCredential = getCredential(PublicKey.from_hex(enterprisePublicKey));
  const rewardCredential = getCredential(PublicKey.from_hex(rewardPublicKey));
  const address = BaseAddress.new(networkId, enterpriseCredential, rewardCredential);

  return address.to_address().to_bech32();
}

export { getBaseAddress };
