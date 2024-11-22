import { type CommonAddressData } from "@/address/index.js";

type AbstractAddress<IsBitcoinCoreCompatible extends boolean = false> = {
  getData: IsBitcoinCoreCompatible extends true
    ? (derivationPath: string, base58RootKey?: string) => CommonAddressData
    : (derivationPath: string) => CommonAddressData;
  importByPrivateKey: IsBitcoinCoreCompatible extends true
    ? (derivationPath: string, privateKey: string, base58RootKey?: string) => CommonAddressData
    : (derivationPath: string, privateKey: string) => CommonAddressData;
};

export { type AbstractAddress };
