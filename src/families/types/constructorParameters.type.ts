import {
  type AvaxDerivationTypeUnion,
  type AdaDerivationTypeUnion,
  type BtcDerivationTypeUnion,
  type DerivationTypeUnion,
  type DerivationTypeMap,
} from "@/types/derivation/index.js";
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
  type TrxDerivationConfigs,
  type TonDerivationConfigs,
} from "@/config/types/index.js";

type BtcParameters = {
  networkPurpose: CommonNetworkPurposeRegTestExtendedUnion;
  derivationConfigs: BtcDerivationConfigs;
};

type AdaParameters = {
  networkPurpose: AdaNetworkPurposeUnion;
  derivationConfigs: AdaDerivationConfigs;
};

type AvaxParameters = {
  networkPurpose: CommonNetworkPurposeUnion;
  derivationConfigs: AvaxDerivationConfigs;
};

type TrxParameters = {
  networkPurpose: null;
  derivationConfigs: TrxDerivationConfigs;
};

type TonParameters = {
  networkPurpose: CommonNetworkPurposeUnion;
  derivationConfigs: TonDerivationConfigs;
};

type ConstructorInconsistentParameters<TDerivationType extends DerivationTypeUnion> =
  TDerivationType extends BtcDerivationTypeUnion
    ? BtcParameters
    : TDerivationType extends AdaDerivationTypeUnion
    ? AdaParameters
    : TDerivationType extends AvaxDerivationTypeUnion
    ? AvaxParameters
    : TDerivationType extends DerivationTypeMap["trxBase"]
    ? TrxParameters
    : TDerivationType extends DerivationTypeMap["tonBase"]
    ? TonParameters
    : Record<string, unknown>;

type ConstructorParameters<TDerivationType extends DerivationTypeUnion> = {
  mnemonic: Mnemonic;
} & ConstructorInconsistentParameters<TDerivationType>;

export { type ConstructorParameters };
