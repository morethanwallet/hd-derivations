import { type AddressData } from "@/address/index.js";

type AbstractAddress<IsBitcoinCoreCompatible extends boolean = false> = {
  getData: IsBitcoinCoreCompatible extends true
    ? (derivationPath: string, base58RootKey?: string) => AddressData
    : (derivationPath: string) => AddressData;
  importByPrivateKey: IsBitcoinCoreCompatible extends true
    ? (derivationPath: string, privateKey: string, base58RootKey?: string) => AddressData
    : (derivationPath: string, privateKey: string) => AddressData;
};

export { type AbstractAddress };
