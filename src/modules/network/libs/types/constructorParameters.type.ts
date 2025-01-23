import type {
  AvaxDerivationTypeUnion,
  AdaDerivationTypeUnion,
  BtcDerivationTypeUnion,
  DerivationTypeUnion,
  DerivationTypeMap,
} from "@/libs/types/index.js";
import { type Mnemonic } from "@/libs/modules/mnemonic/index.js";
import type {
  AdaInstanceParameters,
  AvaxInstanceParameters,
  BtcInstanceParameters,
  TonInstanceParameters,
  TrxInstanceParameters,
} from "./instanceParameters.type.js";

type BtcParameters = {
  networkPurpose: BtcInstanceParameters["networkPurpose"];
  derivationConfigs: BtcInstanceParameters["derivationConfigs"];
};

type AdaParameters = {
  networkPurpose: AdaInstanceParameters["networkPurpose"];
  derivationConfigs: AdaInstanceParameters["derivationConfigs"];
};

type AvaxParameters = {
  networkPurpose: AvaxInstanceParameters["networkPurpose"];
  derivationConfigs: AvaxInstanceParameters["derivationConfigs"];
};

type TrxParameters = {
  networkPurpose: TrxInstanceParameters["networkPurpose"];
  derivationConfigs: TrxInstanceParameters["derivationConfigs"];
};

type TonParameters = {
  networkPurpose: TonInstanceParameters["networkPurpose"];
  derivationConfigs: TonInstanceParameters["derivationConfigs"];
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
