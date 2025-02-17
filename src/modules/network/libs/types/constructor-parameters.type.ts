import type {
  AvaxDerivationTypeUnion,
  AdaDerivationTypeUnion,
  BtcDerivationTypeUnion,
  DerivationTypeUnion,
  GetDerivationTypeUnion,
  BchDerivationTypeUnion,
  XrpDerivationTypeUnion,
  AptDerivationTypeUnion,
  LtcDerivationTypeUnion,
  DotDerivationTypeUnion,
} from "@/libs/types/index.js";
import { DotMnemonic, type Mnemonic } from "@/libs/modules/mnemonic/index.js";
import type {
  AdaDerivationConfig,
  AptDerivationConfig,
  AvaxDerivationConfig,
  BchDerivationConfig,
  BtcDerivationConfig,
  CommonDerivationConfig,
  DogeDerivationConfig,
  DotDerivationConfig,
  LtcDerivationConfig,
  SuiDerivationConfig,
  TonDerivationConfig,
  TrxDerivationConfig,
  XrpDerivationConfig,
  ZecDerivationConfig,
} from "./derivation-config.type.js";

// TODO: Try to use mapping here
type ConstructorDerivationConfigParameters<T extends DerivationTypeUnion> =
  T extends GetDerivationTypeUnion<"solBase">
    ? {}
    : T extends GetDerivationTypeUnion<"evmBase" | "bnbBase">
      ? { derivationConfig?: CommonDerivationConfig }
      : {
          derivationConfig: T extends BtcDerivationTypeUnion
            ? BtcDerivationConfig
            : T extends AdaDerivationTypeUnion
              ? AdaDerivationConfig
              : T extends AvaxDerivationTypeUnion
                ? AvaxDerivationConfig
                : T extends GetDerivationTypeUnion<"trxBase">
                  ? TrxDerivationConfig
                  : T extends GetDerivationTypeUnion<"tonBase">
                    ? TonDerivationConfig
                    : T extends GetDerivationTypeUnion<"suiBase">
                      ? SuiDerivationConfig
                      : T extends BchDerivationTypeUnion
                        ? BchDerivationConfig
                        : T extends DotDerivationTypeUnion
                          ? DotDerivationConfig
                          : T extends XrpDerivationTypeUnion
                            ? XrpDerivationConfig
                            : T extends GetDerivationTypeUnion<"dogeLegacy">
                              ? DogeDerivationConfig
                              : T extends GetDerivationTypeUnion<"zecTransparent">
                                ? ZecDerivationConfig
                                : T extends AptDerivationTypeUnion
                                  ? AptDerivationConfig
                                  : T extends LtcDerivationTypeUnion
                                    ? LtcDerivationConfig
                                    : CommonDerivationConfig;
        };

type ConstructorParameters<T extends DerivationTypeUnion> = {
  mnemonic: Mnemonic;
} & ConstructorDerivationConfigParameters<T> &
  (T extends DotDerivationTypeUnion ? { dotMnemonic: DotMnemonic } : {});

export { type ConstructorParameters };
