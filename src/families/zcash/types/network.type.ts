import { type DerivedItem } from "@/address/index.js";

type AbstractNetwork = {
  derive: (derivationPath: string) => DerivedItem;
  importByPrivateKey: (derivationPath: string, privateKey: string) => DerivedItem;
};

export { type AbstractNetwork };
