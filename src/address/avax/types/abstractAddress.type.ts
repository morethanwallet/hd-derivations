import { type KeyPair, type AddressData } from "@/address/index.js";
import { type NetworkPurpose, type NetworkType } from "@/families/avax/index.js";

type AbstractAddress = {
  getData: (
    derivationPath: string,
    networkType: NetworkType,
    networkPurpose: NetworkPurpose
  ) => AddressData;
  importByPrivateKey: (
    derivationPath: string,
    privateKey: KeyPair["privateKey"],
    networkType: NetworkType,
    networkPurpose: NetworkPurpose
  ) => AddressData;
};

export { type AbstractAddress };
