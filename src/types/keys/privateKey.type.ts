import { type DerivationTypeMap, type DerivationTypeUnion } from "@/types/derivation/index.js";

type CommonPrivateKey = { privateKey: string };

type CardanoBasePrivateKey = { enterprisePrivateKey: string; rewardPrivateKey: string };

type PrivateKey<TDerivationType extends DerivationTypeUnion> =
  TDerivationType extends DerivationTypeMap["adaBase"] ? CardanoBasePrivateKey : CommonPrivateKey;

export { type PrivateKey, type CommonPrivateKey, type CardanoBasePrivateKey };
