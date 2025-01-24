import type {
  AdaInstanceParameters,
  AvaxInstanceParameters,
  BtcInstanceParameters,
  NetworkTypeMap,
  NetworkTypeUnion,
  TonInstanceParameters,
  TrxInstanceParameters,
} from "@/modules/network/libs/types/index.js";

type ConstructorParameters<T extends NetworkTypeUnion> = T extends NetworkTypeMap["btc"]
  ? BtcInstanceParameters
  : T extends NetworkTypeMap["ada"]
  ? AdaInstanceParameters
  : T extends NetworkTypeMap["avax"]
  ? AvaxInstanceParameters
  : T extends NetworkTypeMap["ton"]
  ? TonInstanceParameters
  : T extends NetworkTypeMap["trx"]
  ? TrxInstanceParameters
  : unknown;

export type { ConstructorParameters };
