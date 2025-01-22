import { type Handlers as BtcHandlers } from "../bitcoin/types/handlers.type.js";
import { type Handlers as AdaHandlers } from "../cardano/types/handlers.type.js";
import { type Handlers as TrxHandlers } from "../trx/types/handlers.type.js";
import { type Handlers as AvaxHandlers } from "../avax/types/handlers.type.js";
import { type Handlers as TonHandlers } from "../ton/types/handlers.type.js";
import {
  type AdaDerivationConfigs,
  type AvaxDerivationConfigs,
  type BtcDerivationConfigs,
  type TrxDerivationConfigs,
  type TonDerivationConfigs,
} from "@/config/types/index.js";

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
