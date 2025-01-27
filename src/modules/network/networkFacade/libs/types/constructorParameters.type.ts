import type {
  AdaInstanceParameters,
  AvaxInstanceParameters,
  BtcInstanceParameters,
  NetworkTypeUnion,
  SuiInstanceParameters,
  TonInstanceParameters,
  TrxInstanceParameters,
} from "@/modules/network/libs/types/index.js";


type NetworkTypeMap = {
  btc: "btc";
  ada: "ada";
  avax: "avax";
  trx: "trx";
  ton: "ton";
  sui: "sui";
};


// question: can we omit the `Omit<..., 'network'>` part?
// summary: we can omit the `Omit<..., 'network'>` part
type ConstructorParameters<T extends NetworkTypeUnion> = {
  network: T;
} & (T extends NetworkTypeMap["btc"]
  ? BtcInstanceParameters
  : T extends NetworkTypeMap["ada"]
    ? AdaInstanceParameters
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
