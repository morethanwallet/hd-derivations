import type { CommonDerivationPath, DerivationTypeUnionByNetwork } from "@/libs/types/types.js";

type DotConfig = {
  derivationPathPrefix: Record<
    DerivationTypeUnionByNetwork["dot"],
    CommonDerivationPath["derivationPath"]
  >;
};

const ED25519_CURVE_DERIVATION_PATH_PREFIX = "m/44'/354'";

const dotConfig: DotConfig = {
  derivationPathPrefix: {
    dotStandardHd: ED25519_CURVE_DERIVATION_PATH_PREFIX,
    dotBase: "",
    dotLedger: ED25519_CURVE_DERIVATION_PATH_PREFIX,
  },
};

export { dotConfig };
