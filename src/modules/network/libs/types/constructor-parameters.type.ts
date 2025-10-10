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
  SolDerivationTypeUnion,
} from "@/libs/types/types.js";
import { DotMnemonic, type Mnemonic } from "@/libs/modules/mnemonic/index.js";
import type { GetDerivationConfig } from "./derivation-config.type.js";

// TODO: Try to use mapping here
type ConstructorDerivationConfigParameters<T extends DerivationTypeUnion> =
  T extends GetDerivationTypeUnion<"evmBase" | "bnbBase">
    ? { derivationConfig?: GetDerivationConfig<"evm" | "bnb"> }
    : {
        derivationConfig: T extends BtcDerivationTypeUnion
          ? GetDerivationConfig<"btc">
          : T extends AdaDerivationTypeUnion
            ? GetDerivationConfig<"ada">
            : T extends AvaxDerivationTypeUnion
              ? GetDerivationConfig<"avax">
              : T extends GetDerivationTypeUnion<"trxBase">
                ? GetDerivationConfig<"trx">
                : T extends GetDerivationTypeUnion<"tonBase">
                  ? GetDerivationConfig<"ton">
                  : T extends GetDerivationTypeUnion<"suiBase">
                    ? GetDerivationConfig<"sui">
                    : T extends BchDerivationTypeUnion
                      ? GetDerivationConfig<"bch">
                      : T extends DotDerivationTypeUnion
                        ? GetDerivationConfig<"dot">
                        : T extends XrpDerivationTypeUnion
                          ? GetDerivationConfig<"xrp">
                          : T extends GetDerivationTypeUnion<"dogeLegacy">
                            ? GetDerivationConfig<"doge">
                            : T extends GetDerivationTypeUnion<"zecTransparent">
                              ? GetDerivationConfig<"zec">
                              : T extends AptDerivationTypeUnion
                                ? GetDerivationConfig<"apt">
                                : T extends LtcDerivationTypeUnion
                                  ? GetDerivationConfig<"ltc">
                                  : T extends GetDerivationTypeUnion<SolDerivationTypeUnion>
                                    ? GetDerivationConfig<"sol">
                                    : never;
      };

type ConstructorParameters<T extends DerivationTypeUnion> = {
  mnemonic: Mnemonic;
} & ConstructorDerivationConfigParameters<T> &
  (T extends DotDerivationTypeUnion ? { dotMnemonic: DotMnemonic } : {});

export { type ConstructorParameters };
