import { type AddressData } from "@/address/index.js";
import { type Address } from "./index.js";

// TODO: Use Abstract Address values where applicable
type AbstractNetwork = {
  getAddressData: (derivationPath: string, addressType: Address) => AddressData;
  importByPrivateKey: (
    derivationPath: string,
    privateKey: string,
    addressType: Address
  ) => AddressData;
};

export { type AbstractNetwork };
