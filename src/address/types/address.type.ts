import { type BitcoinCoreAddress } from "@/families/bitcoin/index.js";
import { type AddressType } from "../enums/index.js";
import { type KeyPair } from "./index.js";
import { type ValueOf } from "ts-essentials";
import {
  type NetworkPurpose as AvaxNetworkPurpose,
  type NetworkType as AvaxNetworkType,
} from "@/families/avax/index.js";
import {
  type NetworkPurpose as CardanoNetworkPurpose,
  type CardanoAddress,
} from "@/families/cardano/index.js";
import {
  type BaseAddressKeyPair as CardanoBaseAddressKeyPair,
  type DerivedBaseItem as CardanoDerivedBaseItem,
} from "@/address/cardano/index.js";
import { type NetworkPurpose as XrpNetworkPurpose, type XrpAddress } from "@/families/xrp/index.js";

type DerivedItem<TAddress extends ValueOf<typeof AddressType>> =
  TAddress extends typeof AddressType.ADA_BASE
    ? CardanoDerivedBaseItem
    : {
        path: string;
        address: string;
        mnemonic: string;
      } & KeyPair;

type AddressSpecificParameters<TAddress extends ValueOf<typeof AddressType>> =
  TAddress extends BitcoinCoreAddress
    ? { base58RootKey: string }
    : TAddress extends typeof AddressType.AVAX
    ? { networkType: AvaxNetworkType; networkPurpose: AvaxNetworkPurpose }
    : TAddress extends CardanoAddress
    ? { networkPurpose: CardanoNetworkPurpose }
    : TAddress extends XrpAddress
    ? { addressType: XrpAddress; networkPurpose: XrpNetworkPurpose; destinationTag?: number }
    : Record<string, unknown>;

type GetDataParameters<TAddress extends ValueOf<typeof AddressType>> = {
  derivationPath: string;
} & AddressSpecificParameters<TAddress>;

type GetData<TAddress extends ValueOf<typeof AddressType>> = (
  parameters: GetDataParameters<TAddress>
) => DerivedItem<TAddress>;

type ImportByPrivateKeyParameters<TAddress extends ValueOf<typeof AddressType>> = {
  derivationPath: string;
} & (TAddress extends typeof AddressType.ADA_BASE
  ? {
      enterprisePrivateKey: CardanoBaseAddressKeyPair["enterprisePrivateKey"];
      rewardPrivateKey: CardanoBaseAddressKeyPair["rewardPrivateKey"];
    }
  : { privateKey: KeyPair["privateKey"] }) &
  AddressSpecificParameters<TAddress>;

type ImportByPrivateKey<TAddress extends ValueOf<typeof AddressType>> = (
  parameters: ImportByPrivateKeyParameters<TAddress>
) => DerivedItem<TAddress>;

type AbstractAddress<TAddress extends ValueOf<typeof AddressType>> = {
  getData: GetData<TAddress>;
  importByPrivateKey: ImportByPrivateKey<TAddress>;
};

export { type DerivedItem, type AbstractAddress };
