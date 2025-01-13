import { type DerivedItem } from "@/keyDerivation/index.js";

type AbstractNetwork = {
  derive: (derivationPath: string) => DerivedItem;
  importByPrivateKey: (derivationPath: string, privateKey: string) => DerivedItem;
};

export { type AbstractNetwork };
