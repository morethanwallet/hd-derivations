import { type KeyPair, type CommonAddressData } from "@/address/index.js";
import { type NetworkPurpose, type NetworkType } from "@/network/avax/index.js";

type AbstractAddress = {
  getData: (
    derivationPath: string,
    networkType: NetworkType,
    networkPurpose: NetworkPurpose
  ) => CommonAddressData;
  importByPrivateKey: (
    derivationPath: string,
    privateKey: KeyPair["privateKey"],
    networkType: NetworkType,
    networkPurpose: NetworkPurpose
  ) => CommonAddressData;
};

export { type AbstractAddress };
