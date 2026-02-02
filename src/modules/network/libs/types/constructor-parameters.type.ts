import type { GetDerivationConfig } from "./derivation-config.type.js";

import type {
  DerivationTypeUnion,
  GetDerivationTypeUnion,
  DerivationTypeUnionByNetwork,
} from "@/libs/types/types.js";
import { type DotMnemonic, type Mnemonic } from "@/libs/modules/mnemonic/index.js";

// TODO: Try to use mapping here
type ConstructorDerivationConfigParameters<T extends DerivationTypeUnion> =
  T extends GetDerivationTypeUnion<"evmBase" | "bnbBase">
    ? { derivationConfig?: GetDerivationConfig<"evm" | "bnb"> }
    : {
        derivationConfig: T extends DerivationTypeUnionByNetwork["btc"]
          ? GetDerivationConfig<"btc">
          : T extends DerivationTypeUnionByNetwork["ada"]
            ? GetDerivationConfig<"ada">
            : T extends DerivationTypeUnionByNetwork["avax"]
              ? GetDerivationConfig<"avax">
              : T extends DerivationTypeUnionByNetwork["trx"]
                ? GetDerivationConfig<"trx">
                : T extends DerivationTypeUnionByNetwork["ton"]
                  ? GetDerivationConfig<"ton">
                  : T extends DerivationTypeUnionByNetwork["sui"]
                    ? GetDerivationConfig<"sui">
                    : T extends DerivationTypeUnionByNetwork["bch"]
                      ? GetDerivationConfig<"bch">
                      : T extends DerivationTypeUnionByNetwork["dot"]
                        ? GetDerivationConfig<"dot">
                        : T extends DerivationTypeUnionByNetwork["xrp"]
                          ? GetDerivationConfig<"xrp">
                          : T extends DerivationTypeUnionByNetwork["doge"]
                            ? GetDerivationConfig<"doge">
                            : T extends DerivationTypeUnionByNetwork["zec"]
                              ? GetDerivationConfig<"zec">
                              : T extends DerivationTypeUnionByNetwork["apt"]
                                ? GetDerivationConfig<"apt">
                                : T extends DerivationTypeUnionByNetwork["ltc"]
                                  ? GetDerivationConfig<"ltc">
                                  : T extends DerivationTypeUnionByNetwork["sol"]
                                    ? GetDerivationConfig<"sol">
                                    : never;
      };

type ConstructorParameters<T extends DerivationTypeUnion> = {
  mnemonic: Mnemonic;
} & ConstructorDerivationConfigParameters<T> &
  (T extends DerivationTypeUnionByNetwork["dot"] ? { dotMnemonic: DotMnemonic } : {});

export { type ConstructorParameters };
