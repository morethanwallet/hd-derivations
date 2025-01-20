import { type KeysConfig } from "@/keys/types/index.js";
import {
  type AvaxDerivationTypeUnion,
  type AdaDerivationTypeUnion,
  type BtcDerivationTypeUnion,
} from "../derivationTypeUnion.type.js";

type CommonKeysConfig = { keysConfig: KeysConfig };

type BtcDerivationConfigs = ({ derivationType: BtcDerivationTypeUnion } & CommonKeysConfig)[];

type AdaDerivationConfigs = { derivationType: AdaDerivationTypeUnion }[];

type AvaxDerivationConfigs = ({ derivationType: AvaxDerivationTypeUnion } & CommonKeysConfig)[];

export { type BtcDerivationConfigs, type AdaDerivationConfigs, type AvaxDerivationConfigs };
