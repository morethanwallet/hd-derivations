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
  AdaDerivationConfig,
  AvaxDerivationConfig,
  BchDerivationConfig,
  BtcDerivationConfig,
  CommonDerivationConfig,
  DotDerivationConfig,
  SuiDerivationConfig,
  TonDerivationConfig,
  TrxDerivationConfig,
  XrpDerivationConfig,
} from "./derivation-config.type.js";

// TODO: Try to use mapping here
type ConstructorDerivationConfigParameters<T extends DerivationTypeUnion> = {
  derivationConfig: T extends BtcDerivationTypeUnion
    ? BtcDerivationConfig
    : T extends AdaDerivationTypeUnion
      ? AdaDerivationConfig
      : T extends AvaxDerivationTypeUnion
        ? AvaxDerivationConfig
        : T extends DerivationTypeMap["trxBase"]
          ? TrxDerivationConfig
          : T extends DerivationTypeMap["tonBase"]
            ? TonDerivationConfig
            : T extends DerivationTypeMap["suiBase"]
              ? SuiDerivationConfig
              : T extends BchDerivationTypeUnion
                ? BchDerivationConfig
                : T extends DerivationTypeMap["dotBase"]
                  ? DotDerivationConfig
                  : T extends XrpDerivationTypeUnion
                    ? XrpDerivationConfig
                    : CommonDerivationConfig;
};

type ConstructorParameters<TDerivationType extends DerivationTypeUnion> = {
  mnemonic: Mnemonic;
} & ConstructorDerivationConfigParameters<TDerivationType>;

export { type ConstructorParameters };
