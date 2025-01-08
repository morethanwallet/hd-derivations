import { type BitcoinCoreAddress } from "@/families/bitcoin/index.js";
import { type AddressType } from "../enums/index.js";
import { type KeyPair } from "./index.js";
import { type ValueOf } from "ts-essentials";

type AddressData = {
  path: string;
  address: string;
  mnemonic: string;
} & KeyPair;

type GetData<Address extends ValueOf<typeof AddressType>> = Address extends BitcoinCoreAddress
  ? (derivationPath: string, base58RootKey: string) => AddressData
  : (derivationPath: string) => AddressData;

type ImportByPrivateKey<Address extends ValueOf<typeof AddressType>> =
  Address extends BitcoinCoreAddress
    ? (
        derivationPath: string,
        privateKey: KeyPair["privateKey"],
        base58RootKey: string
      ) => AddressData
    : (derivationPath: string, privateKey: KeyPair["privateKey"]) => AddressData;

type AbstractAddress<Address extends ValueOf<typeof AddressType>> = {
  getData: GetData<Address>;
  importByPrivateKey: ImportByPrivateKey<Address>;
};

export { type AddressData, type AbstractAddress };
