import { type KeysConfig } from "@/keys/types/index.js";
import {
  type AvaxDerivationTypeUnion,
  type AdaDerivationTypeUnion,
  type BtcDerivationTypeUnion,
  type DerivationTypeMap,
} from "@/types/derivation/index.js";

type CommonKeysConfig = { keysConfig: KeysConfig };

type BtcDerivationConfigs = ({ derivationType: BtcDerivationTypeUnion } & CommonKeysConfig)[];

type AdaDerivationConfigs = { derivationType: AdaDerivationTypeUnion }[];

type AvaxDerivationConfigs = ({ derivationType: AvaxDerivationTypeUnion } & CommonKeysConfig)[];

type TrxDerivationConfigs = ({ derivationType: DerivationTypeMap["trxBase"] } & CommonKeysConfig)[];

export {
  type BtcDerivationConfigs,
  type AdaDerivationConfigs,
  type AvaxDerivationConfigs,
  type TrxDerivationConfigs,
};
