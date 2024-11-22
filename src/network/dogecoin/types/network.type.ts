import { type CommonAddressData } from "@/address/index.js";

type AbstractNetwork = {
  getAddressData: (derivationPath: string) => CommonAddressData;
  importByPrivateKey: (derivationPath: string, privateKey: string) => CommonAddressData;
};

export { type AbstractNetwork };
