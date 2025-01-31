import type {
  AdaInstanceParameters,
  AvaxInstanceParameters,
  BtcInstanceParameters,
  NetworkTypeMap,
  NetworkTypeUnion,
  SuiInstanceParameters,
  TonInstanceParameters,
  TrxInstanceParameters,
  BchInstanceParameters,
  XrpInstanceParameters,
  BnbInstanceParameters,
  DotInstanceParameters,
} from "@/modules/network/libs/types/index.js";

type GetNetworkParameters<T extends NetworkTypeUnion> = {
  network: T;
} & (T extends NetworkTypeMap["btc"]
  ? BtcInstanceParameters
  : T extends NetworkTypeMap["ada"]
    ? AdaInstanceParameters
    : T extends NetworkTypeMap["avax"]
      ? AvaxInstanceParameters
      : T extends NetworkTypeMap["ton"]
        ? TonInstanceParameters
        : T extends NetworkTypeMap["trx"]
          ? TrxInstanceParameters
          : T extends NetworkTypeMap["sui"]
            ? SuiInstanceParameters
            : T extends NetworkTypeMap["bch"]
              ? BchInstanceParameters
              : T extends NetworkTypeMap["xrp"]
                ? XrpInstanceParameters
                : T extends NetworkTypeMap["bnb"]
                  ? BnbInstanceParameters
                  : T extends NetworkTypeMap["dot"]
                    ? DotInstanceParameters
                    : {
                        networkPurpose: null;
                        derivationConfigs: {};
                        mnemonic: null;
                        scheme: null;
                      });

export type { GetNetworkParameters };
