import { type BitcoinCoreAddressList } from "@/families/bitcoin/index.js";
import { type AddressList } from "../enums/index.js";
import { type KeyPair } from "./index.js";
import { type ValueOf } from "ts-essentials";
import {
  type NetworkPurpose as AvaxNetworkPurpose,
  type NetworkType as AvaxNetworkType,
} from "@/families/avax/index.js";
import {
  type NetworkPurpose as CardanoNetworkPurpose,
  type CardanoAddressList,
} from "@/families/cardano/index.js";
import {
  type BaseAddressKeyPair as CardanoBaseAddressKeyPair,
  type DerivedBaseItem as CardanoDerivedBaseItem,
} from "@/address/cardano/index.js";
import {
  type NetworkPurpose as XrpNetworkPurpose,
  type XrpAddressList,
} from "@/families/xrp/index.js";

type AddressUnion = ValueOf<typeof AddressList>;

type DerivedItem<TAddress extends AddressUnion> = TAddress extends typeof AddressList.ADA_BASE
  ? CardanoDerivedBaseItem
  : {
      path: string;
      address: string;
      mnemonic: string;
    } & KeyPair;

type AddressSpecificParameters<TAddress extends AddressUnion> =
  TAddress extends BitcoinCoreAddressList
    ? { base58RootKey: string }
    : TAddress extends typeof AddressList.AVAX
    ? { networkType: AvaxNetworkType; networkPurpose: AvaxNetworkPurpose }
    : TAddress extends CardanoAddressList
    ? { networkPurpose: CardanoNetworkPurpose }
    : TAddress extends XrpAddressList
    ? { addressType: XrpAddressList; networkPurpose: XrpNetworkPurpose; destinationTag?: number }
    : Record<string, unknown>;

type GetDerivedItemParameters<TAddress extends AddressUnion> = {
  derivationPath: string;
} & AddressSpecificParameters<TAddress>;

type GetDerivedItem<TAddress extends AddressUnion> = (
  parameters: GetDerivedItemParameters<TAddress>
) => DerivedItem<TAddress>;

type ImportByPrivateKeyParameters<TAddress extends AddressUnion> = {
  derivationPath: string;
} & (TAddress extends typeof AddressList.ADA_BASE
  ? {
      enterprisePrivateKey: CardanoBaseAddressKeyPair["enterprisePrivateKey"];
      rewardPrivateKey: CardanoBaseAddressKeyPair["rewardPrivateKey"];
    }
  : { privateKey: KeyPair["privateKey"] }) &
  AddressSpecificParameters<TAddress>;

type ImportByPrivateKey<TAddress extends AddressUnion> = (
  parameters: ImportByPrivateKeyParameters<TAddress>
) => DerivedItem<TAddress>;

type AbstractAddress<TAddress extends AddressUnion> = {
  derive: GetDerivedItem<TAddress>;
  importByPrivateKey: ImportByPrivateKey<TAddress>;
};

export { type DerivedItem, type AbstractAddress };
