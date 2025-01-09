import { type DerivedItem } from "@/address/index.js";
import { type AbstractNetwork as CommonAbstractNetwork } from "@/families/types/index.js";
import { type BitcoinAddressList, type BitcoinCoreAddressList } from "./address.type.js";

type BitcoinNetwork = "bitcoinCore" | "multiBitHd" | "bitcoin";

type GetDerivedItem<T extends BitcoinNetwork> = T extends "bitcoin"
  ? (derivationPath: string, addressType: BitcoinAddressList) => DerivedItem
  : T extends "bitcoinCore"
  ? (
      derivationPath: string,
      addressType: BitcoinCoreAddressList,
      base58RootKey: string
    ) => DerivedItem
  : CommonAbstractNetwork["derive"];

type ImportByPrivateKey<T extends BitcoinNetwork> = T extends "bitcoin"
  ? (derivationPath: string, privateKey: string, addressType: BitcoinAddressList) => DerivedItem
  : T extends "bitcoinCore"
  ? (
      derivationPath: string,
      privateKey: string,
      addressType: BitcoinCoreAddressList,
      base58RootKey: string
    ) => DerivedItem
  : CommonAbstractNetwork["importByPrivateKey"];

type AbstractNetwork<T extends BitcoinNetwork> = {
  derive: GetDerivedItem<T>;
  importByPrivateKey: ImportByPrivateKey<T>;
};

export { type AbstractNetwork };
