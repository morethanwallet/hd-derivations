import { type KeysConfig } from "@/keys/types/index.js";
import {
  type AdaDerivationTypeUnion,
  type BtcDerivationTypeUnion,
} from "../derivationTypeUnion.type.js";

type BtcDerivationConfigs = { derivationType: BtcDerivationTypeUnion; keysConfig: KeysConfig }[];

type AdaDerivationConfigs = { derivationType: AdaDerivationTypeUnion }[];

export { type BtcDerivationConfigs, type AdaDerivationConfigs };
