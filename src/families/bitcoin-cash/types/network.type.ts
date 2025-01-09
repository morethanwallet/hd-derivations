import { type DerivedItem } from "@/address/index.js";
import { type AddressList } from "@/address/bitcoin-cash/index.js";

// TODO: Use Abstract Address values where applicable
type AbstractNetwork = {
  derive: (derivationPath: string, addressType: AddressList) => DerivedItem;
  importByPrivateKey: (
    derivationPath: string,
    privateKey: string,
    addressType: AddressList
  ) => DerivedItem;
};

export { type AbstractNetwork };
