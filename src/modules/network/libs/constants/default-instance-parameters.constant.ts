import type {
  AdaInstanceParameters,
  AptInstanceParameters,
  AvaxInstanceParameters,
  BchInstanceParameters,
  BnbInstanceParameters,
  BtcInstanceParameters,
  DogeInstanceParameters,
  DotInstanceParameters,
  EvmInstanceParameters,
  LtcInstanceParameters,
  SolInstanceParameters,
  SuiInstanceParameters,
  TonInstanceParameters,
  TrxInstanceParameters,
  XrpInstanceParameters,
  ZecInstanceParameters,
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
  },
};

const DEFAULT_BTC_INSTANCE_PARAMETERS: BtcInstanceParameters = {
  network: "btc",
  derivationConfig: {
    networkPurpose: "mainnet",
    derivationType: "btcTaproot",
  },
};

const DEFAULT_TRX_INSTANCE_PARAMETERS: TrxInstanceParameters = {
  network: "trx",
  derivationConfig: { derivationType: "trxBase" },
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
  },
};

const DEFAULT_XRP_INSTANCE_PARAMETERS: XrpInstanceParameters = {
  network: "xrp",
  derivationConfig: {
    derivationType: "xrpBase",
    networkPurpose: "mainnet",
  },
};

const DEFAULT_BNB_INSTANCE_PARAMETERS: BnbInstanceParameters = {
  network: "bnb",
};

const DEFAULT_EVM_INSTANCE_PARAMETERS: EvmInstanceParameters = {
  network: "evm",
};

const DEFAULT_DOT_INSTANCE_PARAMETERS: DotInstanceParameters = {
  network: "dot",
  derivationConfig: { ss58Format: 0, derivationType: "dotStandardHd", scheme: "ed25519" },
};

const DEFAULT_SOL_INSTANCE_PARAMETERS: SolInstanceParameters = {
  network: "sol",
};

const DEFAULT_DOGE_INSTANCE_PARAMETERS: DogeInstanceParameters = {
  network: "doge",
  derivationConfig: {
    derivationType: "dogeLegacy",
    networkPurpose: "mainnet",
  },
};

const DEFAULT_ZEC_INSTANCE_PARAMETERS: ZecInstanceParameters = {
  network: "zec",
  derivationConfig: {
    derivationType: "zecTransparent",
    networkPurpose: "mainnet",
  },
};

const DEFAULT_APT_INSTANCE_PARAMETERS: AptInstanceParameters = {
  network: "apt",
  derivationConfig: {
    scheme: "ed25519",
    derivationType: "aptLegacy",
  },
};

const DEFAULT_LTC_INSTANCE_PARAMETERS: LtcInstanceParameters = {
  network: "ltc",
  derivationConfig: {
    derivationType: "ltcNativeSegWit",
    networkPurpose: "mainnet",
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
  DEFAULT_XRP_INSTANCE_PARAMETERS,
  DEFAULT_BNB_INSTANCE_PARAMETERS,
  DEFAULT_EVM_INSTANCE_PARAMETERS,
  DEFAULT_DOT_INSTANCE_PARAMETERS,
  DEFAULT_SOL_INSTANCE_PARAMETERS,
  DEFAULT_DOGE_INSTANCE_PARAMETERS,
  DEFAULT_ZEC_INSTANCE_PARAMETERS,
  DEFAULT_APT_INSTANCE_PARAMETERS,
  DEFAULT_LTC_INSTANCE_PARAMETERS,
};
