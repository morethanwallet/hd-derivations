import type { CommonDerivationPath, DerivationTypeUnionByNetwork } from "@/libs/types/types.js";

type DotConfig = {
  derivationPathPrefix: Record<
    DerivationTypeUnionByNetwork["dot"],
    CommonDerivationPath["derivationPath"]
  >;
};

const dotConfig: DotConfig = {
  derivationPathPrefix: { dotStandardHd: "m/44'/354'", dotBase: "" },
};

export { dotConfig };
