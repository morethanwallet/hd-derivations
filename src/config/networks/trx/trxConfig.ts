import { networks } from "bitcoinjs-lib";
import { type TrxInstanceConfig } from "@/config/types/index.js";

const trxConfig = {
  trxBase: {
    derivationPathPrefix: "m/44'/195'",
    keysConfig: { ...networks.bitcoin, pubKeyHash: 0x41 },
  },
};

const defaultTrxInstanceConfig: TrxInstanceConfig = {
  network: "trx",
  mnemonic: "",
  networkPurpose: null,
  derivationConfigs: [{ derivationType: "trxBase", keysConfig: trxConfig.trxBase.keysConfig }],
};

export { trxConfig, defaultTrxInstanceConfig };
