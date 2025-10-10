import type { PrefixConfig } from "@/libs/modules/curves/curves.js";
import type { CommonDerivationPath } from "@/libs/types/types.js";

type Secp256k1DerivationConfig = {
  derivationPathPrefix: CommonDerivationPath["derivationPath"];
  prefixConfig: PrefixConfig;
};

export type { Secp256k1DerivationConfig };
