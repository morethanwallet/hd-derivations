import { avaxConfig } from "../modules/config/avaxConfig.js";
import { btcConfig } from "../modules/config/btcConfig.js";
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
  derivationConfigs: [
    { derivationType: "enterprise" },
    { derivationType: "reward" },
    { derivationType: "adaBase" },
  ],
};

const DEFAULT_AVAX_INSTANCE_PARAMETERS: AvaxInstanceParameters = {
  network: "avax",
  networkPurpose: "mainnet",
  derivationConfigs: [
    { derivationType: "avaxP", prefixConfig: avaxConfig.mainnet.avax.prefixConfig },
    { derivationType: "avaxX", prefixConfig: avaxConfig.mainnet.avax.prefixConfig },
  ],
};

const DEFAULT_BTC_INSTANCE_PARAMETERS: BtcInstanceParameters = {
  network: "btc",
  networkPurpose: "mainnet",
  derivationConfigs: [
    { derivationType: "legacy", prefixConfig: btcConfig.mainnet.legacy.prefixConfig },
    { derivationType: "segWit", prefixConfig: btcConfig.mainnet.segWit.prefixConfig },
    {
      derivationType: "nativeSegWit",
      prefixConfig: btcConfig.mainnet.nativeSegWit.prefixConfig,
    },
    { derivationType: "taproot", prefixConfig: btcConfig.mainnet.taproot.prefixConfig },
    { derivationType: "p2wsh", prefixConfig: btcConfig.mainnet.p2wsh.prefixConfig },
    {
      derivationType: "p2wshInP2sh",
      prefixConfig: btcConfig.mainnet.p2wshInP2sh.prefixConfig,
    },
  ],
};

const DEFAULT_TRX_INSTANCE_PARAMETERS: TrxInstanceParameters = {
  network: "trx",
  derivationConfigs: [{ derivationType: "trxBase", prefixConfig: trxConfig.trxBase.prefixConfig }],
};

const DEFAULT_TON_INSTANCE_PARAMETERS: TonInstanceParameters = {
  network: "ton",
  networkPurpose: "mainnet",
  derivationConfigs: [{ derivationType: "tonBase" }],
};

const DEFAULT_SUI_INSTANCE_PARAMETERS: SuiInstanceParameters = {
  network: "sui",
  derivationConfigs: [{ derivationType: "suiBase" }],
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
