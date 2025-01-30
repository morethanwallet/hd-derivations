import { type DerivationTypeMap } from "../derivation/derivation-type-map.type.js";
import { type DerivationTypeUnion } from "../derivation/derivation-type-union.type.js";

type CommonPrivateKey = { privateKey: string };

type AdaBasePrivateKey = {
  enterprisePrivateKey: string;
  rewardPrivateKey: string;
};

type PrivateKey<TDerivationType extends DerivationTypeUnion> =
  TDerivationType extends DerivationTypeMap["adaBase"] ? AdaBasePrivateKey : CommonPrivateKey;

export { type PrivateKey, type CommonPrivateKey, type AdaBasePrivateKey };
