import { getCommonPrefixConfig } from "./libs/helpers/index.js";
import type { Bip32DerivationCommonConfig } from "./libs/types/index.js";

type XrpConfig = Bip32DerivationCommonConfig;

const xrpConfig: XrpConfig = {
  ...getCommonPrefixConfig("mainnet"),
  derivationPathPrefix: "m/44'/144'",
};

export { xrpConfig };
