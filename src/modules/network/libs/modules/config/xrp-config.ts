import { getCommonPrefixConfig } from "./libs/helpers/index.js";
import type { Secp256k1DerivationConfig } from "./libs/types/index.js";

type XrpConfig = Secp256k1DerivationConfig;

const xrpConfig: XrpConfig = {
  ...getCommonPrefixConfig("mainnet"),
  derivationPathPrefix: "m/44'/144'",
};

export { xrpConfig };
