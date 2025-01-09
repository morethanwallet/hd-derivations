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

type DerivedItem<Address extends ValueOf<typeof AddressType>> =
  Address extends typeof AddressType.ADA_BASE
    ? CardanoDerivedBaseItem
    : {
        path: string;
        address: string;
        mnemonic: string;
      } & KeyPair;

type AddressSpecificParameters<Address extends ValueOf<typeof AddressType>> =
  Address extends BitcoinCoreAddress
    ? { base58RootKey: string }
    : Address extends typeof AddressType.AVAX
    ? { networkType: AvaxNetworkType; networkPurpose: AvaxNetworkPurpose }
    : Address extends CardanoAddress
    ? { networkPurpose: CardanoNetworkPurpose }
    : Address extends XrpAddress
    ? { addressType: XrpAddress; networkPurpose: XrpNetworkPurpose; destinationTag?: number }
    : Record<string, unknown>;

type GetDataParameters<Address extends ValueOf<typeof AddressType>> = {
  derivationPath: string;
} & AddressSpecificParameters<Address>;

type GetData<Address extends ValueOf<typeof AddressType>> = (
  parameters: GetDataParameters<Address>
) => DerivedItem<Address>;

type ImportByPrivateKeyParameters<Address extends ValueOf<typeof AddressType>> = {
  derivationPath: string;
} & (Address extends typeof AddressType.ADA_BASE
  ? {
      enterprisePrivateKey: CardanoBaseAddressKeyPair["enterprisePrivateKey"];
      rewardPrivateKey: CardanoBaseAddressKeyPair["rewardPrivateKey"];
    }
  : { privateKey: KeyPair["privateKey"] }) &
  AddressSpecificParameters<Address>;

type ImportByPrivateKey<Address extends ValueOf<typeof AddressType>> = (
  parameters: ImportByPrivateKeyParameters<Address>
) => DerivedItem<Address>;

type AbstractAddress<Address extends ValueOf<typeof AddressType>> = {
  getData: GetData<Address>;
  importByPrivateKey: ImportByPrivateKey<Address>;
};

export { type DerivedItem, type AbstractAddress };
