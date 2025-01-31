import type { PrefixConfigProperty } from "@/libs/modules/keys/index.js";
import { networks } from "bitcoinjs-lib";

type TrxConfig = {
  trxBase: {
    derivationPathPrefix: string;
  } & PrefixConfigProperty;
};

const trxConfig: TrxConfig = {
  trxBase: {
    derivationPathPrefix: "m/44'/195'",
    prefixConfig: { ...networks.bitcoin, pubKeyHash: 0x41 },
  },
};

export { trxConfig };
