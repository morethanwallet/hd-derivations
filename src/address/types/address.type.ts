import { ValueOf } from "@/types/index.js";
import { type KeysConfig, type KeyPair } from "./index.js";
import { type DerivationPath } from "@/enums/index.js";

type CommonAddressMetadata = {
  path: string;
  address: string | undefined;
  mnemonic: string;
} & KeyPair;

type CardanoAddressMetadata = {
  stakingPrivateKey: string;
  stakingPublicKey: string;
  stakingPath: string;
} & CommonAddressMetadata;

type AddressMetadata<T extends ValueOf<typeof DerivationPath>> = T extends typeof DerivationPath.ADA
  ? CardanoAddressMetadata
  : CommonAddressMetadata;

type AddressConfig = {
  keysConfig: KeysConfig;
  derivationPath: string;
};

type AbstractAddress<T extends ValueOf<typeof DerivationPath>> = {
  getAddressMetadata: (addressIndex: number, base58RootKey?: string) => AddressMetadata<T>;
  importByPrivateKey: T extends typeof DerivationPath.ADA
    ? (privateKey: string, stakingPrivateKey: string) => AddressMetadata<T>
    : (privateKey: string) => AddressMetadata<T>;
};

type Address<T extends ValueOf<typeof DerivationPath>> = {
  config: AddressConfig;
  createAddressInstance: (config: AddressConfig, mnemonic?: string) => AbstractAddress<T>;
};

export {
  type Address,
  type AddressMetadata,
  type AddressConfig,
  type AbstractAddress,
  type CardanoAddressMetadata,
};
