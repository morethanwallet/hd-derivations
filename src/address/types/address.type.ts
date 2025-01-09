import { type BitcoinCoreAddress } from "@/families/bitcoin/index.js";
import { type AddressType } from "../enums/index.js";
import { type KeyPair } from "./index.js";
import { type ValueOf } from "ts-essentials";
import {
  type NetworkPurpose as AvaxNetworkPurpose,
  type NetworkType as AvaxNetworkType,
} from "@/families/avax/index.js";
import { type CardanoAddress } from "@/families/cardano/index.js";
import {
  type ImportByPrivateKey as CardanoImportByPrivateKey,
  type GetData as CardanoGetData,
} from "@/address/cardano/index.js";

type AddressData = {
  path: string;
  address: string;
  mnemonic: string;
} & KeyPair;

type GetData<Address extends ValueOf<typeof AddressType>> = Address extends BitcoinCoreAddress
  ? (derivationPath: string, base58RootKey: string) => AddressData
  : Address extends typeof AddressType.AVAX
  ? (
      derivationPath: string,
      networkType: AvaxNetworkType,
      networkPurpose: AvaxNetworkPurpose
    ) => AddressData
  : Address extends CardanoAddress
  ? CardanoGetData<Address>
  : (derivationPath: string) => AddressData;

type ImportByPrivateKey<Address extends ValueOf<typeof AddressType>> =
  Address extends BitcoinCoreAddress
    ? (
        derivationPath: string,
        privateKey: KeyPair["privateKey"],
        base58RootKey: string
      ) => AddressData
    : Address extends typeof AddressType.AVAX
    ? (
        derivationPath: string,
        privateKey: KeyPair["privateKey"],
        networkType: AvaxNetworkType,
        networkPurpose: AvaxNetworkPurpose
      ) => AddressData
    : Address extends CardanoAddress
    ? CardanoImportByPrivateKey<Address>
    : (derivationPath: string, privateKey: KeyPair["privateKey"]) => AddressData;

type AbstractAddress<Address extends ValueOf<typeof AddressType>> = {
  getData: GetData<Address>;
  importByPrivateKey: ImportByPrivateKey<Address>;
};

export { type AddressData, type AbstractAddress };
