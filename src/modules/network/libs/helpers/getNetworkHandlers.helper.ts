import type {
  AdaDerivationConfig,
  AdaHandlers,
  AvaxDerivationConfig,
  AvaxHandlers,
  BtcDerivationConfig,
  BtcHandlers,
  TonDerivationConfig,
  TonHandlers,
  TrxDerivationConfig,
  TrxHandlers,
} from "../types/index.js";

type CombinedHandlers = BtcHandlers & AdaHandlers & TrxHandlers & AvaxHandlers & TonHandlers;

type CombinedDerivationConfigs =
  | BtcDerivationConfig[]
  | AdaDerivationConfig[]
  | AvaxDerivationConfig[]
  | TrxDerivationConfig[]
  | TonDerivationConfig[];

function getNetworkHandlers<
  T extends CombinedDerivationConfigs,
  S extends Partial<CombinedHandlers>
>(configs: T, handlers: S) {
  return Object.fromEntries(
    configs.map(({ derivationType }) => {
      return [derivationType, handlers[derivationType]];
    })
  );
}

export { getNetworkHandlers };
