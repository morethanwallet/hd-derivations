import type { PrefixConfigProperty } from "@/libs/modules/keys/index.js";
import type { CommonDerivationPath } from "@/libs/types/index.js";

type CommonBip32DerivationConfig = {
  derivationPathPrefix: CommonDerivationPath["derivationPath"];
} & PrefixConfigProperty;

export type { CommonBip32DerivationConfig };
