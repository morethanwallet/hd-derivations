import { avaxConfig } from "../modules/config/avax-config.js";
import { btcConfig } from "../modules/config/btc-config.js";
import { bchConfig, trxConfig } from "../modules/config/index.js";
import type {
  AdaInstanceParameters,
  AvaxInstanceParameters,
  BchInstanceParameters,
  BtcInstanceParameters,
  SuiInstanceParameters,
  TonInstanceParameters,
  TrxInstanceParameters,
} from "../types/index.js";

const DEFAULT_ADA_INSTANCE_PARAMETERS: AdaInstanceParameters = {
  network: "ada",

  derivationConfig: { networkPurpose: "mainnet", derivationType: "adaBase" },
};

const DEFAULT_AVAX_INSTANCE_PARAMETERS: AvaxInstanceParameters = {
  network: "avax",
  derivationConfig: {
    networkPurpose: "mainnet",
    derivationType: "avaxX",
    prefixConfig: avaxConfig.mainnet.avax.prefixConfig,
  },
};

const DEFAULT_BTC_INSTANCE_PARAMETERS: BtcInstanceParameters = {
  network: "btc",

  derivationConfig: {
    networkPurpose: "mainnet",
    derivationType: "btcTaproot",
    prefixConfig: btcConfig.mainnet.btcTaproot.prefixConfig,
  },
};

const DEFAULT_TRX_INSTANCE_PARAMETERS: TrxInstanceParameters = {
  network: "trx",
  derivationConfig: { derivationType: "trxBase", prefixConfig: trxConfig.trxBase.prefixConfig },
};

const DEFAULT_TON_INSTANCE_PARAMETERS: TonInstanceParameters = {
  network: "ton",
  derivationConfig: {
    networkPurpose: "mainnet",
    derivationType: "tonBase",
    contractVersion: "v5r1",
    isFriendlyFormat: true,
    workChain: 0,
    friendlyFormatArguments: {
      bounceable: false,
      urlSafe: true,
    },
  },
};

const DEFAULT_SUI_INSTANCE_PARAMETERS: SuiInstanceParameters = {
  network: "sui",
  derivationConfig: { scheme: "ed25519", derivationType: "suiBase" },
};

const DEFAULT_BCH_INSTANCE_PARAMETERS: BchInstanceParameters = {
  network: "bch",
  derivationConfig: {
    networkPurpose: "mainnet",
    derivationType: "bchCashAddr",
    prefixConfig: bchConfig.mainnet.bchCashAddr.prefixConfig,
  },
};

export {
  DEFAULT_ADA_INSTANCE_PARAMETERS,
  DEFAULT_AVAX_INSTANCE_PARAMETERS,
  DEFAULT_BTC_INSTANCE_PARAMETERS,
  DEFAULT_TRX_INSTANCE_PARAMETERS,
  DEFAULT_TON_INSTANCE_PARAMETERS,
  DEFAULT_SUI_INSTANCE_PARAMETERS,
  DEFAULT_BCH_INSTANCE_PARAMETERS,
};
