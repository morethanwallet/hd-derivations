import { type KeyPair, type AddressData } from "@/address/index.js";
import { type AddressType } from "./index.js";
type CardanoBaseAddressMetadata = Pick<AddressData, "address" | "mnemonic"> & {
  enterprisePrivateKey: string;
  enterprisePublicKey: string;
  enterprisePath: string;
  rewardPrivateKey: string;
  rewardPublicKey: string;
  rewardPath: string;
};
type AbstractAddress = {
  getData: (
    derivationPath: string,
    addressType: AddressType,
    destinationTag?: number
  ) => AddressData;
  importByPrivateKey: (
    derivationPath: string,
    privateKey: KeyPair["privateKey"],
    addressType: AddressType,
    destinationTag?: number
  ) => AddressData;
};

export { type AbstractAddress };
