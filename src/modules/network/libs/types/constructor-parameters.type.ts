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
} from "./instance-parameters.type.js";

type BtcParameters = {
  networkPurpose: BtcInstanceParameters["networkPurpose"];
  derivationConfig: BtcInstanceParameters["derivationConfig"];
};

type AdaParameters = {
  networkPurpose: AdaInstanceParameters["networkPurpose"];
  derivationConfig: AdaInstanceParameters["derivationConfig"];
};

type AvaxParameters = {
  networkPurpose: AvaxInstanceParameters["networkPurpose"];
  derivationConfig: AvaxInstanceParameters["derivationConfig"];
};

type TrxParameters = {
  derivationConfig: TrxInstanceParameters["derivationConfig"];
};

type TonParameters = {
  networkPurpose: TonInstanceParameters["networkPurpose"];
  derivationConfig: TonInstanceParameters["derivationConfig"];
};

type SuiParameters = {
  scheme: SuiInstanceParameters["scheme"];
  derivationConfig: SuiInstanceParameters["derivationConfig"];
};

type ConstructorInconsistentParameters<T extends DerivationTypeUnion> =
  T extends BtcDerivationTypeUnion
    ? BtcParameters
    : T extends AdaDerivationTypeUnion
      ? AdaParameters
      : T extends AvaxDerivationTypeUnion
        ? AvaxParameters
        : T extends DerivationTypeMap["trxBase"]
          ? TrxParameters
          : T extends DerivationTypeMap["tonBase"]
            ? TonParameters
            : T extends DerivationTypeMap["suiBase"]
              ? SuiParameters
              : Record<string, unknown>;

type ConstructorParameters<TDerivationType extends DerivationTypeUnion> = {
  mnemonic: Mnemonic;
} & ConstructorInconsistentParameters<TDerivationType>;

export { type ConstructorParameters };
