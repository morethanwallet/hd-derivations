import { type AddressData } from "@/address/index.js";
import { type Address } from "./index.js";

// TODO: Use Abstract Address values where applicable
type AbstractNetwork = {
  getAddressData: (addressType: Address, derivationPath: string) => AddressData;
  importByPrivateKey: (
    addressType: Address,
    derivationPath: string,
    privateKey: string
  ) => AddressData;
};

export { type AbstractNetwork };
