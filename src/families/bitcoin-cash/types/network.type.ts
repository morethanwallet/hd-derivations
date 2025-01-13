import { type DerivedItem } from "@/keyDerivation/types/index.js";
import { type AddressUnion } from "./address.type.js";

type AbstractNetwork = {
  derive: (derivationPath: string, addressType: AddressUnion) => DerivedItem<AddressUnion>;
  importByPrivateKey: (
    derivationPath: string,
    privateKey: string,
    addressType: AddressUnion
  ) => DerivedItem<AddressUnion>;
};

export { type AbstractNetwork };
