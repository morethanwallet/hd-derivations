import { networks } from "bitcoinjs-lib";

const trxConfig = {
  trxBase: {
    derivationPathPrefix: "m/44'/195'",
    prefixConfig: { ...networks.bitcoin, pubKeyHash: 0x41 },
  },
};

export { trxConfig };
