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
  ? Omit<BtcInstanceParameters, "network">
  : T extends NetworkTypeMap["ada"]
    ? Omit<AdaInstanceParameters, "network">
    : T extends NetworkTypeMap["avax"]
      ? Omit<AvaxInstanceParameters, "network">
      : T extends NetworkTypeMap["ton"]
        ? Omit<TonInstanceParameters, "network">
        : T extends NetworkTypeMap["trx"]
          ? Omit<TrxInstanceParameters, "network">
          : T extends NetworkTypeMap["sui"]
            ? Omit<SuiInstanceParameters, "network">
            : {
                networkPurpose: null;
                derivationConfigs: [];
                mnemonic: null;
                scheme: null;
              });

export type { ConstructorParameters };
