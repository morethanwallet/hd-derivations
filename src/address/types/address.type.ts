import { type ValueOf } from "@/types/index.js";
import { type KeysConfig, type KeyPair } from "./index.js";
import { type DerivationPath } from "@/enums/index.js";

// TODO: Refactor Cardano typing

type AddressData = {
  path: string;
  address: string;
  mnemonic: string;
} & KeyPair;
type CardanoBaseAddressMetadata = Pick<AddressData, "address" | "mnemonic"> & {
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
  : AddressData;

type AddressConfig = {
  keysConfig: KeysConfig;
  derivationPath: string;
};

type AbstractAddress<T extends ValueOf<typeof DerivationPath>> = {
  getAddressMetadata: T extends typeof DerivationPath.ADA
    ? <C extends CardanoShelleyAddressType>(
        addressIndex: number,
        addressType: C
      ) => CardanoAddressMetadata<C>
    : (addressIndex: number) => AddressData;
  importByPrivateKey: T extends typeof DerivationPath.ADA
    ? <C extends CardanoShelleyAddressType>(
        privateKey: string,
        rewardPrivateKey: C extends "base" ? string : null,
        addressType: C
      ) => CardanoAddressMetadata<C>
    : (privateKey: string) => AddressData;
};

type Address<T extends ValueOf<typeof DerivationPath>> = {
  config: AddressConfig;
  createAddressInstance: (config: AddressConfig, mnemonic?: string) => AbstractAddress<T>;
};

export {
  type Address,
  type AddressData,
  type AddressConfig,
  type AbstractAddress,
  type CardanoAddressMetadata,
  type CardanoShelleyAddressType,
};
