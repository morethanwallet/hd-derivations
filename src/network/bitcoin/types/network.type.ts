import { type AddressData } from "@/address/index.js";
import { type BitcoinCoreAddress, type BitcoinAddress } from "./index.js";
import { type AbstractNetwork as CommonAbstractNetwork } from "@/network/types/index.js";

type BitcoinNetwork = "bitcoinCore" | "multiBitHd" | "bitcoin";

type GetAddressData<T extends BitcoinNetwork> = T extends "bitcoin"
  ? (addressType: BitcoinAddress, derivationPath: string) => AddressData
  : T extends "bitcoinCore"
  ? (addressType: BitcoinCoreAddress, derivationPath: string, base58RootKey: string) => AddressData
  : CommonAbstractNetwork["getAddressData"];

type ImportByPrivateKey<T extends BitcoinNetwork> = T extends "bitcoin"
  ? (addressType: BitcoinAddress, derivationPath: string, privateKey: string) => AddressData
  : T extends "bitcoinCore"
  ? (addressType: BitcoinCoreAddress, derivationPath: string, base58RootKey: string) => AddressData
  : CommonAbstractNetwork["importByPrivateKey"];

type AbstractNetwork<T extends BitcoinNetwork> = {
  getAddressData: GetAddressData<T>;
  importByPrivateKey: ImportByPrivateKey<T>;
};

export { type AbstractNetwork };
