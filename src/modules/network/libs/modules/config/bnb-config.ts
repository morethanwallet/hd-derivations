import type { Bip32DerivationCommonConfig } from "./libs/types/index.js";
import { getCommonPrefixConfig } from "./libs/helpers/index.js";

type BnbConfig = Bip32DerivationCommonConfig;

const bnbConfig: BnbConfig = {
  ...getCommonPrefixConfig("mainnet"),
  derivationPathPrefix: "m/44'/714'",
};

export { bnbConfig };
