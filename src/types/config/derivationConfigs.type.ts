import { type KeysConfig } from "@/keys/types/index.js";
import {
  type AvaxDerivationTypeUnion,
  type AdaDerivationTypeUnion,
  type BtcDerivationTypeUnion,
} from "../derivationTypeUnion.type.js";

type BtcDerivationConfigs = { derivationType: BtcDerivationTypeUnion; keysConfig: KeysConfig }[];

type AdaDerivationConfigs = { derivationType: AdaDerivationTypeUnion }[];

type AvaxDerivationConfigs = { derivationType: AvaxDerivationTypeUnion; keysConfig: KeysConfig }[];

export { type BtcDerivationConfigs, type AdaDerivationConfigs, type AvaxDerivationConfigs };
