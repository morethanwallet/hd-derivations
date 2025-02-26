import type { PrefixConfig } from "@/libs/modules/keys/index.js";
import type { CommonDerivationPath } from "@/libs/types/index.js";

type Secp256k1DerivationConfig = {
  derivationPathPrefix: CommonDerivationPath["derivationPath"];
  prefixConfig: PrefixConfig;
};

export type { Secp256k1DerivationConfig };
