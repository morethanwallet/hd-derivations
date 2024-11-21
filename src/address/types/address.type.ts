import { type ValueOf } from "@/types/index.js";
import { type KeysConfig, type KeyPair, type AvaxChainType } from "./index.js";
import { type DerivationPath } from "@/enums/index.js";

// TODO: Refactor Cardano typing

type AddressMetadata = {
  path: string;
  address: string;
  mnemonic: string;
} & KeyPair;

type CardanoBaseAddressMetadata = Pick<AddressMetadata, "address" | "mnemonic"> & {
  enterprisePrivateKey: string;
  enterprisePublicKey: string;
  enterprisePath: string;
  rewardPrivateKey: string;
  rewardPublicKey: string;
  rewardPath: string;
};

type CardanoShelleyAddressType = "base" | "reward" | "enterprise";

type XrpAddressType = "x" | "base";

type CardanoAddressMetadata<T extends CardanoShelleyAddressType> = T extends "base"
  ? CardanoBaseAddressMetadata
  : AddressMetadata;

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
    ? (addressIndex: number, chainType: AvaxChainType) => AddressMetadata
    : T extends typeof DerivationPath.XRP
    ? (addressIndex: number, chainType: XrpAddressType, destinationTag?: number) => AddressMetadata
    : T extends BitcoinCoreAddress
    ? (addressIndex: number, base58RootKey?: string) => AddressMetadata
    : T extends typeof DerivationPath.ADA
    ? <C extends CardanoShelleyAddressType>(
        addressIndex: number,
        addressType: C
      ) => CardanoAddressMetadata<C>
    : (addressIndex: number) => AddressMetadata;
  importByPrivateKey: T extends typeof DerivationPath.ADA
    ? <C extends CardanoShelleyAddressType>(
        privateKey: string,
        rewardPrivateKey: C extends "base" ? string : null,
        addressType: C
      ) => CardanoAddressMetadata<C>
    : T extends typeof DerivationPath.AVAX
    ? (privateKey: string, chainType: AvaxChainType) => AddressMetadata
    : T extends typeof DerivationPath.XRP
    ? (privateKey: string, chainType: XrpAddressType, destinationTag?: number) => AddressMetadata
    : (privateKey: string) => AddressMetadata;
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
  type CardanoShelleyAddressType,
  type XrpAddressType,
};
