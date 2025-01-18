import {
  type AvaxDerivationTypeUnion,
  type AdaDerivationTypeUnion,
  type BtcDerivationTypeUnion,
  type DerivationTypeUnion,
} from "@/types/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import {
  type CommonNetworkPurposeUnion,
  type AdaNetworkPurposeUnion,
  type CommonNetworkPurposeRegTestExtendedUnion,
} from "@/types/network/index.js";
import {
  type AdaDerivationConfigs,
  type BtcDerivationConfigs,
  type AvaxDerivationConfigs,
} from "@/types/config/index.js";

type ConstructorInconsistentParameters<TDerivationType extends DerivationTypeUnion> =
  TDerivationType extends BtcDerivationTypeUnion
    ? {
        networkPurpose: CommonNetworkPurposeRegTestExtendedUnion;
        derivationConfigs: BtcDerivationConfigs;
      }
    : TDerivationType extends AdaDerivationTypeUnion
    ? {
        networkPurpose: AdaNetworkPurposeUnion;
        derivationConfigs: AdaDerivationConfigs;
      }
    : TDerivationType extends AvaxDerivationTypeUnion
    ? {
        networkPurpose: CommonNetworkPurposeUnion;
        derivationConfigs: AvaxDerivationConfigs;
      }
    : Record<string, unknown>;

type ConstructorParameters<TDerivationType extends DerivationTypeUnion> = {
  mnemonic: Mnemonic;
} & ConstructorInconsistentParameters<TDerivationType>;

export { type ConstructorParameters };
