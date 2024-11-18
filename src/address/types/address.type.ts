import { type ValueOf } from "@/types/index.js";
import { type KeysConfig, type KeyPair, type AvaxChainType } from "./index.js";
import { type DerivationPath } from "@/enums/index.js";

type CommonAddressMetadata = {
  path: string;
  address: string;
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

type BitcoinCoreAddress =
  | typeof DerivationPath.LEGACY_BTC
  | typeof DerivationPath.TAPROOT_BTC
  | typeof DerivationPath.SEG_WIT_BTC
  | typeof DerivationPath.NATIVE_SEG_WIT_BTC;

type AbstractAddress<T extends ValueOf<typeof DerivationPath>> = {
  getAddressMetadata: T extends typeof DerivationPath.AVAX
    ? (addressIndex: number, chainType: AvaxChainType) => AddressMetadata<T>
    : T extends BitcoinCoreAddress
    ? (addressIndex: number, base58RootKey?: string) => AddressMetadata<T>
    : (addressIndex: number) => AddressMetadata<T>;
  importByPrivateKey: T extends typeof DerivationPath.ADA
    ? (privateKey: string, stakingPrivateKey: string) => AddressMetadata<T>
    : T extends typeof DerivationPath.AVAX
    ? (privateKey: string, chainType: AvaxChainType) => AddressMetadata<T>
    : (privateKey: string) => AddressMetadata<T>;
};

type Address<T extends ValueOf<typeof DerivationPath>> = {
  config: AddressConfig;
  createAddressInstance: (config: AddressConfig, mnemonic?: string) => AbstractAddress<T>;
};

export { type Address, type AddressMetadata, type AddressConfig, type AbstractAddress };
