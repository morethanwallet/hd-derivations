import type { PrefixConfigProperty } from "@/libs/modules/keys/index.js";
import type { DerivationPath } from "@/libs/types/index.js";

type CommonBip32DerivationConfig = {
  derivationPathPrefix: DerivationPath["derivationPath"];
} & PrefixConfigProperty;

export type { CommonBip32DerivationConfig };
