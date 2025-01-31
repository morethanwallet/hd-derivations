import { networks } from "bitcoinjs-lib";
import type { Bip32DerivationCommonConfig } from "./libs/types/index.js";

type TrxConfig = {
  trxBase: Bip32DerivationCommonConfig;
};

const trxConfig: TrxConfig = {
  trxBase: {
    derivationPathPrefix: "m/44'/195'",
    prefixConfig: { ...networks.bitcoin, pubKeyHash: 0x41 },
  },
};

export { trxConfig };
