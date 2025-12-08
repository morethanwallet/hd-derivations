import { type Address } from "@/libs/modules/address/libs/types/index.js";
import { type CommonKeyPair, type DerivationTypeUnionByNetwork } from "@/libs/types/types.js";
import { Wallet } from "xrpl";
import type { DestinationTagProperty } from "./libs/types/index.js";

type GetXrpAddressParameters = {
  publicKey: CommonKeyPair["publicKey"];
  privateKey: CommonKeyPair["privateKey"];
  isTestnet: boolean;
  derivationType: DerivationTypeUnionByNetwork["xrp"];
} & DestinationTagProperty;

function getXrpAddress({
  publicKey,
  privateKey,
  isTestnet,
  destinationTag,
  derivationType,
}: GetXrpAddressParameters): Address["address"] {
  const wallet = new Wallet(publicKey, privateKey);
  const stringFormattedDestinationTag =
    typeof destinationTag === "string" ? Number(destinationTag) : destinationTag;

  return derivationType === "xrpBase"
    ? wallet.classicAddress
    : wallet.getXAddress(stringFormattedDestinationTag, isTestnet);
}

export { getXrpAddress };
