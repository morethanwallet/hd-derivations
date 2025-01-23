import { type DerivationTypeMap } from "../derivation/derivationTypeMap.type.js";
import { type DerivationTypeUnion } from "../derivation/derivationTypeUnion.type.js";

type CommonPrivateKey = { privateKey: string };

type CardanoBasePrivateKey = { enterprisePrivateKey: string; rewardPrivateKey: string };

type PrivateKey<TDerivationType extends DerivationTypeUnion> =
  TDerivationType extends DerivationTypeMap["adaBase"] ? CardanoBasePrivateKey : CommonPrivateKey;

export { type PrivateKey, type CommonPrivateKey, type CardanoBasePrivateKey };
