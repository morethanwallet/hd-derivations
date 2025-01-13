import { type AbstractKeyDerivation } from "@/keyDerivation/types/index.js";
import { type AddressUnion } from "./address.type.js";
import { type NetworkPurposeUnion as CommonNetworkPurposeUnion } from "@/families/types/index.js";

type NetworkPurposeUnion = Exclude<CommonNetworkPurposeUnion, "regtest">;

type XrpAbstractAddress = AbstractKeyDerivation<AddressUnion>;

type GetDerivedItemParameters = Omit<
  Parameters<XrpAbstractAddress["deriveFromMnemonic"]>[0],
  "networkPurpose"
>;

type ImportByPrivateKeyParameters = Omit<
  Parameters<XrpAbstractAddress["importByPrivateKey"]>[0],
  "networkPurpose"
>;

type AbstractNetwork = {
  derive: (
    parameters: GetDerivedItemParameters
  ) => ReturnType<XrpAbstractAddress["deriveFromMnemonic"]>;
  importByPrivateKey: (
    parameters: ImportByPrivateKeyParameters
  ) => ReturnType<XrpAbstractAddress["importByPrivateKey"]>;
};

export { type AbstractNetwork, type NetworkPurposeUnion };
