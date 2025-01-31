import type { PrefixConfigProperty } from "@/libs/modules/keys/index.js";

type Bip32DerivationCommonConfig = {
  derivationPathPrefix: string;
} & PrefixConfigProperty;

export type { Bip32DerivationCommonConfig };
