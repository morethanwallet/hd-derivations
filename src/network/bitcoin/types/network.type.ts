import { type CommonAddressData } from "@/address/index.js";
import { type BitcoinCoreAddress, type BitcoinAddress } from "./index.js";

type BitcoinNetworkType = "bitcoinCore" | "multiBitHd" | "bitcoin";

type GetAddressData<T extends BitcoinNetworkType> = T extends "bitcoin"
  ? (addressType: BitcoinAddress, derivationPath: string) => CommonAddressData
  : T extends "bitcoinCore"
  ? (
      addressType: BitcoinCoreAddress,
      derivationPath: string,
      base58RootKey: string
    ) => CommonAddressData
  : (derivationPath: string) => CommonAddressData;

type ImportByPrivateKey<T extends BitcoinNetworkType> = T extends "bitcoin"
  ? (addressType: BitcoinAddress, derivationPath: string, privateKey: string) => CommonAddressData
  : T extends "bitcoinCore"
  ? (
      addressType: BitcoinCoreAddress,
      derivationPath: string,
      base58RootKey: string
    ) => CommonAddressData
  : (derivationPath: string, privateKey: string) => CommonAddressData;

type AbstractNetwork<T extends BitcoinNetworkType> = {
  getAddressData: GetAddressData<T>;
  importByPrivateKey: ImportByPrivateKey<T>;
};

export { type AbstractNetwork };
