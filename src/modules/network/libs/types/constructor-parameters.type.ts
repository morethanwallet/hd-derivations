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
} from "./instance-parameters.type.js";
import type { CommonDerivationConfig } from "./derivation-config.type.js";

// TODO: Try to use mapping here
type ConstructorDerivationConfigParameters<T extends DerivationTypeUnion> =
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
                  : { derivationConfig: CommonDerivationConfig };

type ConstructorParameters<TDerivationType extends DerivationTypeUnion> = {
  mnemonic: Mnemonic;
} & ConstructorDerivationConfigParameters<TDerivationType>;

export { type ConstructorParameters };
