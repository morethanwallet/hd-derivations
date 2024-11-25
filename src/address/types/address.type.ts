import { type ValueOf } from "@/types/index.js";
import { type KeysConfig, type KeyPair, type AvaxChainType } from "./index.js";
import { type DerivationPath } from "@/enums/index.js";

// TODO: Refactor Cardano typing

type CommonAddressData = {
  path: string;
  address: string;
  mnemonic: string;
} & KeyPair;

type CardanoBaseAddressMetadata = Pick<CommonAddressData, "address" | "mnemonic"> & {
  enterprisePrivateKey: string;
  enterprisePublicKey: string;
  enterprisePath: string;
  rewardPrivateKey: string;
  rewardPublicKey: string;
  rewardPath: string;
};

type CardanoShelleyAddressType = "base" | "reward" | "enterprise";

type CardanoAddressMetadata<T extends CardanoShelleyAddressType> = T extends "base"
  ? CardanoBaseAddressMetadata
  : CommonAddressData;

type AddressConfig = {
  keysConfig: KeysConfig;
  derivationPath: string;
};

type AbstractAddress<T extends ValueOf<typeof DerivationPath>> = {
  getAddressMetadata: T extends typeof DerivationPath.AVAX
    ? (addressIndex: number, chainType: AvaxChainType) => CommonAddressData
    : T extends typeof DerivationPath.ADA
    ? <C extends CardanoShelleyAddressType>(
        addressIndex: number,
        addressType: C
      ) => CardanoAddressMetadata<C>
    : (addressIndex: number) => CommonAddressData;
  importByPrivateKey: T extends typeof DerivationPath.ADA
    ? <C extends CardanoShelleyAddressType>(
        privateKey: string,
        rewardPrivateKey: C extends "base" ? string : null,
        addressType: C
      ) => CardanoAddressMetadata<C>
    : T extends typeof DerivationPath.AVAX
    ? (privateKey: string, chainType: AvaxChainType) => CommonAddressData
    : (privateKey: string) => CommonAddressData;
};

type Address<T extends ValueOf<typeof DerivationPath>> = {
  config: AddressConfig;
  createAddressInstance: (config: AddressConfig, mnemonic?: string) => AbstractAddress<T>;
};

export {
  type Address,
  type CommonAddressData,
  type AddressConfig,
  type AbstractAddress,
  type CardanoAddressMetadata,
  type CardanoShelleyAddressType,
};
