import { type AddressData } from "@/address/index.js";

type AbstractNetwork = {
  getAddressData: (derivationPath: string) => AddressData;
  importByPrivateKey: (derivationPath: string, privateKey: string) => AddressData;
};

export { type AbstractNetwork };
