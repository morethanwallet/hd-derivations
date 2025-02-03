import { getCommonPrefixConfig } from "./libs/helpers/index.js";
import type { CommonBip32DerivationConfig } from "./libs/types/index.js";

type XrpConfig = CommonBip32DerivationConfig;

const xrpConfig: XrpConfig = {
  ...getCommonPrefixConfig("mainnet"),
  derivationPathPrefix: "m/44'/144'",
};

export { xrpConfig };
