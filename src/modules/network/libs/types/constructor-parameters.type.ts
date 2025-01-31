import type {
  AvaxDerivationTypeUnion,
  AdaDerivationTypeUnion,
  BtcDerivationTypeUnion,
  DerivationTypeUnion,
  DerivationTypeMap,
  BchDerivationTypeUnion,
  XrpDerivationTypeUnion,
} from "@/libs/types/index.js";
import { type Mnemonic } from "@/libs/modules/mnemonic/index.js";
import type {
  AdaInstanceParameters,
  AvaxInstanceParameters,
  BtcInstanceParameters,
  TonInstanceParameters,
  TrxInstanceParameters,
  SuiInstanceParameters,
  BchInstanceParameters,
  XrpInstanceParameters,
  BnbInstanceParameters,
} from "./instance-parameters.type.js";

// TODO: Try to use mapping here
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
              : T extends BchDerivationTypeUnion
                ? Pick<BchInstanceParameters, "derivationConfig">
                : T extends XrpDerivationTypeUnion
                  ? Pick<XrpInstanceParameters, "derivationConfig">
                  : T extends DerivationTypeMap["bnbBase"]
                    ? Pick<BnbInstanceParameters, "derivationConfig">
                    : Record<string, unknown>;

type ConstructorParameters<TDerivationType extends DerivationTypeUnion> = {
  mnemonic: Mnemonic;
} & ConstructorInconsistentParameters<TDerivationType>;

export { type ConstructorParameters };
