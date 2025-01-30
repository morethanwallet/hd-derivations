import { avaxConfig } from "../modules/config/avax-config.js";
import { btcConfig } from "../modules/config/btc-config.js";
import { trxConfig } from "../modules/config/index.js";
import type {
  AdaInstanceParameters,
  AvaxInstanceParameters,
  BtcInstanceParameters,
  SuiInstanceParameters,
  TonInstanceParameters,
  TrxInstanceParameters,
} from "../types/index.js";

const DEFAULT_ADA_INSTANCE_PARAMETERS: AdaInstanceParameters = {
  network: "ada",
  networkPurpose: "mainnet",
  derivationConfig: { derivationType: "adaBase" },
};

const DEFAULT_AVAX_INSTANCE_PARAMETERS: AvaxInstanceParameters = {
  network: "avax",
  networkPurpose: "mainnet",
  derivationConfig: {
    derivationType: "avaxX",
    prefixConfig: avaxConfig.mainnet.avax.prefixConfig,
  },
};

const DEFAULT_BTC_INSTANCE_PARAMETERS: BtcInstanceParameters = {
  network: "btc",
  networkPurpose: "mainnet",
  derivationConfig: {
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
  networkPurpose: "mainnet",
  derivationConfig: { derivationType: "tonBase" },
};

const DEFAULT_SUI_INSTANCE_PARAMETERS: SuiInstanceParameters = {
  network: "sui",
  derivationConfig: { derivationType: "suiBase" },
  scheme: "ed25519",
};

export {
  DEFAULT_ADA_INSTANCE_PARAMETERS,
  DEFAULT_AVAX_INSTANCE_PARAMETERS,
  DEFAULT_BTC_INSTANCE_PARAMETERS,
  DEFAULT_TRX_INSTANCE_PARAMETERS,
  DEFAULT_TON_INSTANCE_PARAMETERS,
  DEFAULT_SUI_INSTANCE_PARAMETERS,
};
