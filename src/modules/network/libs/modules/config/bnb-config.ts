import type { Secp256k1DerivationConfig } from "./libs/types/index.js";
import { getCommonPrefixConfig } from "./libs/helpers/index.js";

type BnbConfig = Secp256k1DerivationConfig;

const bnbConfig: BnbConfig = {
  ...getCommonPrefixConfig("mainnet"),
  derivationPathPrefix: "m/44'/714'",
};

export { bnbConfig };
