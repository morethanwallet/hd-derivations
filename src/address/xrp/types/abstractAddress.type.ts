import { type KeyPair, type CommonAddressData } from "@/address/index.js";
import { type AddressType } from "./index.js";

type AbstractAddress = {
  getData: (
    derivationPath: string,
    addressType: AddressType,
    destinationTag?: number
  ) => CommonAddressData;
  importByPrivateKey: (
    derivationPath: string,
    privateKey: KeyPair["privateKey"],
    addressType: AddressType,
    destinationTag?: number
  ) => CommonAddressData;
};

export { type AbstractAddress };
