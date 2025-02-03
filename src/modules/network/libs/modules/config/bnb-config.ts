import type { CommonBip32DerivationConfig } from "./libs/types/index.js";
import { getCommonPrefixConfig } from "./libs/helpers/index.js";

type BnbConfig = CommonBip32DerivationConfig;

const bnbConfig: BnbConfig = {
  ...getCommonPrefixConfig("mainnet"),
  derivationPathPrefix: "m/44'/714'",
};

export { bnbConfig };
