import type {
  AdaInstanceParameters,
  AvaxInstanceParameters,
  BtcInstanceParameters,
  NetworkTypeMap,
  NetworkTypeUnion,
  SuiInstanceParameters,
  TonInstanceParameters,
  TrxInstanceParameters,
} from "@/modules/network/libs/types/index.js";

type ConstructorParameters<T extends NetworkTypeUnion> = {
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
            : {
                networkPurpose: null;
                derivationConfigs: {};
                mnemonic: null;
                scheme: null;
              });

export type { ConstructorParameters };
