import type { InstanceParameters } from "../types/index.js";

const DEFAULT_ADA_INSTANCE_PARAMETERS: InstanceParameters["ada"] = {
  network: "ada",
  derivationConfig: { networkPurpose: "mainnet", derivationType: "adaBase" },
};

const DEFAULT_AVAX_INSTANCE_PARAMETERS: InstanceParameters["avax"] = {
  network: "avax",
  derivationConfig: {
    networkPurpose: "mainnet",
    derivationType: "avaxX",
  },
};

const DEFAULT_BTC_INSTANCE_PARAMETERS: InstanceParameters["btc"] = {
  network: "btc",
  derivationConfig: {
    networkPurpose: "mainnet",
    derivationType: "btcTaproot",
  },
};

const DEFAULT_TRX_INSTANCE_PARAMETERS: InstanceParameters["trx"] = {
  network: "trx",
  derivationConfig: { derivationType: "trxBase" },
};

const DEFAULT_TON_INSTANCE_PARAMETERS: InstanceParameters["ton"] = {
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

const DEFAULT_SUI_INSTANCE_PARAMETERS: InstanceParameters["sui"] = {
  network: "sui",
  derivationConfig: { scheme: "ed25519", derivationType: "suiBase" },
};

const DEFAULT_BCH_INSTANCE_PARAMETERS: InstanceParameters["bch"] = {
  network: "bch",
  derivationConfig: {
    networkPurpose: "mainnet",
    derivationType: "bchCashAddr",
  },
};

const DEFAULT_XRP_INSTANCE_PARAMETERS: InstanceParameters["xrp"] = {
  network: "xrp",
  derivationConfig: {
    derivationType: "xrpBase",
    networkPurpose: "mainnet",
  },
};

const DEFAULT_BNB_INSTANCE_PARAMETERS: InstanceParameters["bnb"] = {
  network: "bnb",
};

const DEFAULT_EVM_INSTANCE_PARAMETERS: InstanceParameters["evm"] = {
  network: "evm",
};

const DEFAULT_DOT_INSTANCE_PARAMETERS: InstanceParameters["dot"] = {
  network: "dot",
  derivationConfig: { ss58Format: 0, derivationType: "dotStandardHd", scheme: "ed25519" },
};

const DEFAULT_SOL_INSTANCE_PARAMETERS: InstanceParameters["sol"] = {
  network: "sol",
};

const DEFAULT_DOGE_INSTANCE_PARAMETERS: InstanceParameters["doge"] = {
  network: "doge",
  derivationConfig: {
    derivationType: "dogeLegacy",
    networkPurpose: "mainnet",
  },
};

const DEFAULT_ZEC_INSTANCE_PARAMETERS: InstanceParameters["zec"] = {
  network: "zec",
  derivationConfig: {
    derivationType: "zecTransparent",
    networkPurpose: "mainnet",
  },
};

const DEFAULT_APT_INSTANCE_PARAMETERS: InstanceParameters["apt"] = {
  network: "apt",
  derivationConfig: {
    scheme: "ed25519",
    derivationType: "aptLegacy",
  },
};

const DEFAULT_LTC_INSTANCE_PARAMETERS: InstanceParameters["ltc"] = {
  network: "ltc",
  derivationConfig: {
    derivationType: "ltcNativeSegWit",
    networkPurpose: "mainnet",
  },
};

const DEFAULT_INSTANCE_PARAMETERS = {
  ada: DEFAULT_ADA_INSTANCE_PARAMETERS,
  avax: DEFAULT_AVAX_INSTANCE_PARAMETERS,
  btc: DEFAULT_BTC_INSTANCE_PARAMETERS,
  trx: DEFAULT_TRX_INSTANCE_PARAMETERS,
  ton: DEFAULT_TON_INSTANCE_PARAMETERS,
  sui: DEFAULT_SUI_INSTANCE_PARAMETERS,
  bch: DEFAULT_BCH_INSTANCE_PARAMETERS,
  xrp: DEFAULT_XRP_INSTANCE_PARAMETERS,
  bnb: DEFAULT_BNB_INSTANCE_PARAMETERS,
  evm: DEFAULT_EVM_INSTANCE_PARAMETERS,
  dot: DEFAULT_DOT_INSTANCE_PARAMETERS,
  sol: DEFAULT_SOL_INSTANCE_PARAMETERS,
  doge: DEFAULT_DOGE_INSTANCE_PARAMETERS,
  zec: DEFAULT_ZEC_INSTANCE_PARAMETERS,
  apt: DEFAULT_APT_INSTANCE_PARAMETERS,
  ltc: DEFAULT_LTC_INSTANCE_PARAMETERS,
};
export { DEFAULT_INSTANCE_PARAMETERS };
