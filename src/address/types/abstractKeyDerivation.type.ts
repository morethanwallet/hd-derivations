import { type BitcoinCoreAddressUnion } from "@/families/bitcoin/index.js";
import { type DerivationType } from "../enums/index.js";
import {
  type NetworkPurposeUnion as AvaxNetworkPurposeUnion,
  type NetworkTypeUnion as AvaxNetworkTypeUnion,
} from "@/families/avax/index.js";
import {
  type NetworkPurposeUnion as CardanoNetworkPurposeUnion,
  type AddressUnion as CardanoAddressUnion,
} from "@/families/cardano/index.js";
import { type BaseDerivationKeyPair as CardanoBaseDerivationKeyPair } from "@/address/cardano/types/index.js";
import {
  type NetworkPurpose as XrpNetworkPurpose,
  type AddressUnion as XrpAddressUnion,
} from "@/families/xrp/index.js";
import { type DerivationKeyPair, type DerivationTypeUnion, type DerivedItem } from "./index.js";

type CommonInconsistentDerivationParameters<TDerivationType extends DerivationTypeUnion> =
  TDerivationType extends BitcoinCoreAddressUnion
    ? { base58RootKey: string }
    : TDerivationType extends typeof DerivationType.AVAX
    ? { networkType: AvaxNetworkTypeUnion; networkPurpose: AvaxNetworkPurposeUnion }
    : TDerivationType extends CardanoAddressUnion
    ? { networkPurpose: CardanoNetworkPurposeUnion }
    : TDerivationType extends XrpAddressUnion
    ? { addressType: XrpAddressUnion; networkPurpose: XrpNetworkPurpose; destinationTag?: number }
    : Record<string, unknown>;

type DeriveFromMnemonicParameters<TDerivationType extends DerivationTypeUnion> = {
  derivationPath: string;
} & CommonInconsistentDerivationParameters<TDerivationType>;

type DeriveFromMnemonic<TDerivationType extends DerivationTypeUnion> = (
  parameters: DeriveFromMnemonicParameters<TDerivationType>
) => DerivedItem<TDerivationType>;

type ImportByPrivateKeyParameters<TDerivationType extends DerivationTypeUnion> = {
  derivationPath: string;
} & (TDerivationType extends typeof DerivationType.ADA_BASE
  ? {
      enterprisePrivateKey: CardanoBaseDerivationKeyPair["enterprisePrivateKey"];
      rewardPrivateKey: CardanoBaseDerivationKeyPair["rewardPrivateKey"];
    }
  : { privateKey: DerivationKeyPair["privateKey"] }) &
  CommonInconsistentDerivationParameters<TDerivationType>;

type ImportByPrivateKey<TDerivationType extends DerivationTypeUnion> = (
  parameters: ImportByPrivateKeyParameters<TDerivationType>
) => DerivedItem<TDerivationType>;

type AbstractKeyDerivation<TDerivationType extends DerivationTypeUnion> = {
  derive: DeriveFromMnemonic<TDerivationType>;
  importByPrivateKey: ImportByPrivateKey<TDerivationType>;
};

export { type DerivedItem, type AbstractKeyDerivation };
