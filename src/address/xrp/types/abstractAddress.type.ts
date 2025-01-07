import { type KeyPair, type AddressData } from "@/address/index.js";
import { type AddressType } from "./index.js";

type GetDataParameters = {
  derivationPath: string;
  addressType: AddressType;
  isTestnet: boolean;
  destinationTag?: number;
};

type ImportByPrivateKeyParameters = GetDataParameters & {
  privateKey: KeyPair["privateKey"];
};

type AbstractAddress = {
  getData: (parameters: GetDataParameters) => AddressData;
  importByPrivateKey: (parameters: ImportByPrivateKeyParameters) => AddressData;
};

export { type AbstractAddress };
