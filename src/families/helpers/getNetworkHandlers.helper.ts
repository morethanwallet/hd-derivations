import {
  type AdaDerivationConfigs,
  type AvaxDerivationConfigs,
  type BtcDerivationConfigs,
  type TrxDerivationConfigs,
  type TonDerivationConfigs,
} from "@/config/types/index.js";
import type {
  AdaHandlers,
  AvaxHandlers,
  BtcHandlers,
  TonHandlers,
  TrxHandlers,
} from "../types/index.js";

type CombinedHandlers = BtcHandlers & AdaHandlers & TrxHandlers & AvaxHandlers & TonHandlers;

type CombinedDerivationConfigs =
  | BtcDerivationConfigs
  | AdaDerivationConfigs
  | AvaxDerivationConfigs
  | TrxDerivationConfigs
  | TonDerivationConfigs;

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
