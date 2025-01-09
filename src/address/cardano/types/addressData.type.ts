import {
  type KeyPair,
  type AddressData as CommonAddressData,
  type AddressType,
} from "@/address/index.js";
import { type BaseAddressKeyPair } from "./index.js";
import { type CardanoAddress, type NetworkPurpose } from "@/families/cardano/index.js";

type ReturnTypeCompatibleAddressType = Exclude<CardanoAddress, typeof AddressType.ADA_BASE>;

type BaseAddressData = Pick<CommonAddressData, "address" | "mnemonic"> & {
  enterprisePath: string;
  rewardPath: string;
} & BaseAddressKeyPair;

type AddressData<C extends CardanoAddress> = C extends ReturnTypeCompatibleAddressType
  ? CommonAddressData
  : BaseAddressData;

type GetData<C extends CardanoAddress> = (
  derivationPath: string,
  networkPurpose: NetworkPurpose
) => AddressData<C>;

type ImportByPrivateKey<C extends CardanoAddress> = C extends ReturnTypeCompatibleAddressType
  ? (
      derivationPath: string,
      privateKey: KeyPair["privateKey"],
      networkPurpose: NetworkPurpose
    ) => AddressData<C>
  : (
      derivationPath: string,
      enterprisePrivateKey: BaseAddressKeyPair["enterprisePrivateKey"],
      rewardPrivateKey: BaseAddressKeyPair["rewardPrivateKey"],
      networkPurpose: NetworkPurpose
    ) => AddressData<C>;

export { type ImportByPrivateKey, type GetData, type AddressData };
