import { type AddressData } from "@/address/index.js";
import { type BitcoinCoreAddressType, type BitcoinAddressType } from "@/address/bitcoin/index.js";
import { type AbstractNetwork as CommonAbstractNetwork } from "@/network/types/index.js";

type BitcoinNetwork = "bitcoinCore" | "multiBitHd" | "bitcoin";

type GetAddressData<T extends BitcoinNetwork> = T extends "bitcoin"
  ? (derivationPath: string, addressType: BitcoinAddressType) => AddressData
  : T extends "bitcoinCore"
  ? (
      derivationPath: string,
      addressType: BitcoinCoreAddressType,
      base58RootKey: string
    ) => AddressData
  : CommonAbstractNetwork["getAddressData"];

type ImportByPrivateKey<T extends BitcoinNetwork> = T extends "bitcoin"
  ? (derivationPath: string, privateKey: string, addressType: BitcoinAddressType) => AddressData
  : T extends "bitcoinCore"
  ? (
      derivationPath: string,
      privateKey: string,
      addressType: BitcoinCoreAddressType,
      base58RootKey: string
    ) => AddressData
  : CommonAbstractNetwork["importByPrivateKey"];

type AbstractNetwork<T extends BitcoinNetwork> = {
  getAddressData: GetAddressData<T>;
  importByPrivateKey: ImportByPrivateKey<T>;
};

export { type AbstractNetwork };
