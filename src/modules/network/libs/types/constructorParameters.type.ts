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
  SuiInstanceParameters,
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
  derivationConfigs: TrxInstanceParameters["derivationConfigs"];
};

type TonParameters = {
  networkPurpose: TonInstanceParameters["networkPurpose"];
  derivationConfigs: TonInstanceParameters["derivationConfigs"];
};

type SuiParameters = {
  scheme: SuiInstanceParameters["scheme"];
  derivationConfigs: SuiInstanceParameters["derivationConfigs"];
};

type ConstructorInconsistentParameters<
  TDerivationType extends DerivationTypeUnion,
> = TDerivationType extends BtcDerivationTypeUnion
  ? BtcParameters
  : TDerivationType extends AdaDerivationTypeUnion
    ? AdaParameters
    : TDerivationType extends AvaxDerivationTypeUnion
      ? AvaxParameters
      : TDerivationType extends DerivationTypeMap["trxBase"]
        ? TrxParameters
        : TDerivationType extends DerivationTypeMap["tonBase"]
          ? TonParameters
          : TDerivationType extends DerivationTypeMap["suiBase"]
            ? SuiParameters
            : Record<string, unknown>;

type ConstructorParameters<TDerivationType extends DerivationTypeUnion> = {
  mnemonic: Mnemonic;
} & ConstructorInconsistentParameters<TDerivationType>;

export { type ConstructorParameters };
