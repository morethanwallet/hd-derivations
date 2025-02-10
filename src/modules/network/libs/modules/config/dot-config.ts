import type { CommonDerivationPath } from "@/libs/types/index.js";
import { getCommonPrefixConfig } from "./libs/helpers/index.js";
import type { PrefixConfigProperty } from "@/libs/modules/keys/index.js";
import type { DotNetworkTypeUnion } from "../../types/index.js";

type DotConfig = {
  derivationPathPrefix: {
    [key in DotNetworkTypeUnion]: CommonDerivationPath["derivationPath"];
  };
} & PrefixConfigProperty;

const dotConfig: DotConfig = {
  ...getCommonPrefixConfig("mainnet"),
  derivationPathPrefix: { dot: "m/44'/354'", ksm: "m/44'/434'", aca: "m/44'/787'" },
};

export { dotConfig };
