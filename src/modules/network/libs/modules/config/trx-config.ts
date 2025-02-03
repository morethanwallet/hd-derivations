import { networks } from "bitcoinjs-lib";
import type { CommonBip32DerivationConfig } from "./libs/types/index.js";

type TrxConfig = {
  trxBase: CommonBip32DerivationConfig;
};

const trxConfig: TrxConfig = {
  trxBase: {
    derivationPathPrefix: "m/44'/195'",
    prefixConfig: { ...networks.bitcoin, pubKeyHash: 0x41 },
  },
};

export { trxConfig };
