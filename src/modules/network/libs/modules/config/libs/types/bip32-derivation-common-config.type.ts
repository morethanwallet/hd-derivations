import type { PrefixConfigProperty } from "@/libs/modules/keys/index.js";
import type { DerivationPath } from "@/libs/types/index.js";

type Bip32DerivationCommonConfig = {
  derivationPathPrefix: DerivationPath["derivationPath"];
} & PrefixConfigProperty;

export type { Bip32DerivationCommonConfig };
