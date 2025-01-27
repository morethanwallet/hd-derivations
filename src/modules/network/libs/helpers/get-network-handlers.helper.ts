import type {
  AdaDerivationTypeUnion,
  AvaxDerivationTypeUnion,
  BtcDerivationTypeUnion,
} from "@/libs/types/index.js";
import type {
  AdaDerivationConfig,
  AvaxDerivationConfig,
  BtcDerivationConfig,
  NetworkHandlers,
  SuiDerivationConfig,
  TonDerivationConfig,
  TrxDerivationConfig,
} from "../types/index.js";

type CombinedHandlers = NetworkHandlers<BtcDerivationTypeUnion> &
  NetworkHandlers<AdaDerivationTypeUnion> &
  NetworkHandlers<"trxBase"> &
  NetworkHandlers<AvaxDerivationTypeUnion> &
  NetworkHandlers<"tonBase"> &
  NetworkHandlers<"suiBase">;

type CombinedDerivationConfigs =
  | BtcDerivationConfig[]
  | AdaDerivationConfig[]
  | AvaxDerivationConfig[]
  | TrxDerivationConfig[]
  | TonDerivationConfig[]
  | SuiDerivationConfig[];

function getNetworkHandlers<
  T extends CombinedDerivationConfigs,
  S extends Partial<CombinedHandlers>,
>(configs: T, handlers: S) {
  return Object.fromEntries(
    configs.map(({ derivationType }) => {
      return [derivationType, handlers[derivationType]];
    }),
  );
}

export { getNetworkHandlers };
