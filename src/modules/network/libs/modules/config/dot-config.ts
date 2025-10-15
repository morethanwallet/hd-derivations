import type { CommonDerivationPath, DotDerivationTypeUnion } from "@/libs/types/types.js";

type DotConfig = {
  derivationPathPrefix: Record<DotDerivationTypeUnion, CommonDerivationPath["derivationPath"]>;
};

const dotConfig: DotConfig = {
  derivationPathPrefix: { dotStandardHd: "m/44'/354'", dotBase: "" },
};

export { dotConfig };
