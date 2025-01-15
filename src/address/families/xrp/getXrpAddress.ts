import { type Address } from "@/address/types/index.js";
import { type CommonKeyPair } from "@/keyDerivation/types/index.js";
import { type XrpDerivationTypeUnion } from "@/types/index.js";
import { Wallet } from "xrpl";

type GetXrpAddressParameters = {
  publicKey: CommonKeyPair["publicKey"];
  privateKey: CommonKeyPair["privateKey"];
  isTestnet: boolean;
  derivationType: XrpDerivationTypeUnion;
  destinationTag?: number;
};

function getXrpAddress({
  publicKey,
  privateKey,
  isTestnet,
  destinationTag,
  derivationType,
}: GetXrpAddressParameters): Address["address"] {
  const wallet = new Wallet(publicKey, privateKey);

  return derivationType === "xrpBase"
    ? wallet.classicAddress
    : wallet.getXAddress(destinationTag, isTestnet);
}

export { getXrpAddress };
