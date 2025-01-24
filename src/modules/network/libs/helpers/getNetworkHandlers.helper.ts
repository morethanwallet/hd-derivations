import type {
  AdaDerivationConfig,
  AdaHandlers,
  AvaxDerivationConfig,
  AvaxHandlers,
  BtcDerivationConfig,
  BtcHandlers,
  SuiDerivationConfig,
  SuiHandlers,
  TonDerivationConfig,
  TonHandlers,
  TrxDerivationConfig,
  TrxHandlers,
} from "../types/index.js";

type CombinedHandlers = BtcHandlers &
  AdaHandlers &
  TrxHandlers &
  AvaxHandlers &
  TonHandlers &
  SuiHandlers;

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
