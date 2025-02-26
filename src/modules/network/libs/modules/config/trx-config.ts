import { networks } from "bitcoinjs-lib";
import type { Secp256k1DerivationConfig } from "./libs/types/index.js";

type TrxConfig = {
  trxBase: Secp256k1DerivationConfig;
};

const trxConfig: TrxConfig = {
  trxBase: {
    derivationPathPrefix: "m/44'/195'",
    prefixConfig: { ...networks.bitcoin, pubKeyHash: 0x41 },
  },
};

export { trxConfig };
