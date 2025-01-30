import type { PrefixConfig } from "@/libs/modules/keys/index.js";
import { getCommonPrefixConfig } from "./libs/helpers/index.js";

type XrpConfig = {
  prefixConfig: PrefixConfig;
  derivationPathPrefix: string;
};

const xrpConfig: XrpConfig = {
  ...getCommonPrefixConfig("mainnet"),
  derivationPathPrefix: "m/44'/144'",
};

export { xrpConfig };
