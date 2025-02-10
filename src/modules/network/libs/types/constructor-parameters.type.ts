import type {
  AvaxDerivationTypeUnion,
  AdaDerivationTypeUnion,
  BtcDerivationTypeUnion,
  DerivationTypeUnion,
  DerivationTypeMap,
  BchDerivationTypeUnion,
  XrpDerivationTypeUnion,
  AptDerivationTypeUnion,
} from "@/libs/types/index.js";
import { type Mnemonic } from "@/libs/modules/mnemonic/index.js";
import type {
  AdaDerivationConfig,
  AptDerivationConfig,
  AvaxDerivationConfig,
  BchDerivationConfig,
  BtcDerivationConfig,
  CommonDerivationConfig,
  DogeDerivationConfig,
  DotDerivationConfig,
  SuiDerivationConfig,
  TonDerivationConfig,
  TrxDerivationConfig,
  XrpDerivationConfig,
  ZecDerivationConfig,
} from "./derivation-config.type.js";

// TODO: Try to use mapping here
type ConstructorDerivationConfigParameters<T extends DerivationTypeUnion> =
  T extends DerivationTypeMap["solBase"]
    ? {}
    : {
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
                          : T extends DerivationTypeMap["dogeLegacy"]
                            ? DogeDerivationConfig
                            : T extends DerivationTypeMap["zecTransparent"]
                              ? ZecDerivationConfig
                              : T extends AptDerivationTypeUnion
                                ? AptDerivationConfig
                                : CommonDerivationConfig;
      };

type ConstructorParameters<TDerivationType extends DerivationTypeUnion> = {
  mnemonic: Mnemonic;
} & ConstructorDerivationConfigParameters<TDerivationType>;

export { type ConstructorParameters };
