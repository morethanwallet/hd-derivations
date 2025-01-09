import { type DerivedItem } from "@/address/index.js";
import { type AddressType } from "@/address/bitcoin-cash/index.js";

// TODO: Use Abstract Address values where applicable
type AbstractNetwork = {
  derive: (derivationPath: string, addressType: AddressType) => DerivedItem;
  importByPrivateKey: (
    derivationPath: string,
    privateKey: string,
    addressType: AddressType
  ) => DerivedItem;
};

export { type AbstractNetwork };
