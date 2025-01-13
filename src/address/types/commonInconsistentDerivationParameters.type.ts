import {
  type NetworkPurposeUnion as AvaxNetworkPurposeUnion,
  type NetworkTypeUnion as AvaxNetworkTypeUnion,
} from "@/families/avax/index.js";
import {
  type NetworkPurposeUnion as CardanoNetworkPurposeUnion,
  type AddressUnion as CardanoAddressUnion,
} from "@/families/cardano/index.js";
import {
  type NetworkPurpose as XrpNetworkPurpose,
  type AddressUnion as XrpAddressUnion,
} from "@/families/xrp/index.js";
import { type BitcoinCoreAddressUnion } from "@/families/bitcoin/index.js";
import { type DerivationTypeUnion } from "./derivationTypeUnion.type.js";
import { type DerivationType } from "../enums/index.js";

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

export { type CommonInconsistentDerivationParameters };
