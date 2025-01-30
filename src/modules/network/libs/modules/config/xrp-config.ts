import type { PrefixConfig } from "@/libs/modules/keys/index.js";
import { getCommonPrefixConfig } from "./libs/helpers/index.js";

type Config = {
  prefixConfig: PrefixConfig;
  derivationPathPrefix: string;
};

const config: Config = {
  ...getCommonPrefixConfig("mainnet"),
  derivationPathPrefix: "m/44'/144'",
};

export { config };
