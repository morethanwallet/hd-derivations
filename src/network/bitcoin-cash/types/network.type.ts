import { type CommonAddressData } from "@/address/index.js";
import { type Address } from "./index.js";

// TODO: Use Abstract Address values where applicable
type AbstractNetwork = {
  getAddressData: (addressType: Address, derivationPath: string) => CommonAddressData;
  importByPrivateKey: (
    addressType: Address,
    derivationPath: string,
    privateKey: string
  ) => CommonAddressData;
};

export { type AbstractNetwork };
