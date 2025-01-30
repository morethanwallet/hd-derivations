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

type ConstructorInconsistentParameters<T extends DerivationTypeUnion> =
  T extends BtcDerivationTypeUnion
    ? Pick<BtcInstanceParameters, "derivationConfig">
    : T extends AdaDerivationTypeUnion
      ? Pick<AdaInstanceParameters, "derivationConfig">
      : T extends AvaxDerivationTypeUnion
        ? Pick<AvaxInstanceParameters, "derivationConfig">
        : T extends DerivationTypeMap["trxBase"]
          ? Pick<TrxInstanceParameters, "derivationConfig">
          : T extends DerivationTypeMap["tonBase"]
            ? Pick<TonInstanceParameters, "derivationConfig">
            : T extends DerivationTypeMap["suiBase"]
              ? Pick<SuiInstanceParameters, "derivationConfig">
              : Record<string, unknown>;

type ConstructorParameters<TDerivationType extends DerivationTypeUnion> = {
  mnemonic: Mnemonic;
} & ConstructorInconsistentParameters<TDerivationType>;

export { type ConstructorParameters };
