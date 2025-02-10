import type { CommonDerivationPath } from "@/libs/types/index.js";
import { getCommonPrefixConfig } from "./libs/helpers/index.js";
import type { PrefixConfigProperty } from "@/libs/modules/keys/index.js";

type EvmNetworkTypeUnion = "eth" | "etc";

type EvmConfig = {
  derivationPathPrefix: {
    [key in EvmNetworkTypeUnion]: CommonDerivationPath["derivationPath"];
  };
} & PrefixConfigProperty;

const evmConfig: EvmConfig = {
  ...getCommonPrefixConfig("mainnet"),
  derivationPathPrefix: { eth: "m/44'/60'", etc: "m/44'/61'" },
};

export { evmConfig };
