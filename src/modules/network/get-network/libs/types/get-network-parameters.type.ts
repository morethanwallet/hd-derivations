import type {
  AdaInstanceParameters,
  AvaxInstanceParameters,
  BtcInstanceParameters,
  NetworkTypeUnion,
  SuiInstanceParameters,
  TonInstanceParameters,
  TrxInstanceParameters,
  BchInstanceParameters,
  XrpInstanceParameters,
  BnbInstanceParameters,
  EvmInstanceParameters,
  DotInstanceParameters,
  SolInstanceParameters,
  DogeInstanceParameters,
  ZecInstanceParameters,
  AptInstanceParameters,
  LtcInstanceParameters,
} from "@/modules/network/libs/types/index.js";

type NetworkToNetworkParameters = {
  btc: BtcInstanceParameters;
  ada: AdaInstanceParameters;
  avax: AvaxInstanceParameters;
  ton: TonInstanceParameters;
  trx: TrxInstanceParameters;
  sui: SuiInstanceParameters;
  bch: BchInstanceParameters;
  dot: DotInstanceParameters;
  xrp: XrpInstanceParameters;
  bnb: BnbInstanceParameters;
  evm: EvmInstanceParameters;
  sol: SolInstanceParameters;
  doge: DogeInstanceParameters;
  zec: ZecInstanceParameters;
  apt: AptInstanceParameters;
  ltc: LtcInstanceParameters;
};

type GetNetworkParameters<T extends NetworkTypeUnion> = {
  network: T;
} & NetworkToNetworkParameters[T];

export type { GetNetworkParameters };
