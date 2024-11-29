import { type AddressData } from "@/address/index.js";
import { type AddressType } from "@/address/bitcoin-cash/index.js";

// TODO: Use Abstract Address values where applicable
type AbstractNetwork = {
  getAddressData: (derivationPath: string, addressType: AddressType) => AddressData;
  importByPrivateKey: (
    derivationPath: string,
    privateKey: string,
    addressType: AddressType
  ) => AddressData;
};

export { type AbstractNetwork };
