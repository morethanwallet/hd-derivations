import { type Address } from "@/libs/modules/address/libs/types/index.js";
import { type CommonKeyPair, type XrpDerivationTypeUnion } from "@/libs/types/index.js";
import { Wallet } from "xrpl";
import type { DestinationTagProperty } from "./libs/types/index.js";

type GetXrpAddressParameters = {
  publicKey: CommonKeyPair["publicKey"];
  privateKey: CommonKeyPair["privateKey"];
  isTestnet: boolean;
  derivationType: XrpDerivationTypeUnion;
} & DestinationTagProperty;

function getXrpAddress({
  publicKey,
  privateKey,
  isTestnet,
  destinationTag,
  derivationType,
}: GetXrpAddressParameters): Address["address"] {
  const wallet = new Wallet(publicKey, privateKey);
  const numericDestinationTag = Number(destinationTag);

  return derivationType === "xrpBase"
    ? wallet.classicAddress
    : wallet.getXAddress(numericDestinationTag, isTestnet);
}

export { getXrpAddress };
