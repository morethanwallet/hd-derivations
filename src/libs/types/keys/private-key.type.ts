import type {
  GetDerivationTypeUnion,
  DerivationTypeUnion,
} from "../derivation/derivation-type-union.type.js";

type CommonPrivateKey = { privateKey: string };

type AdaBasePrivateKey = {
  enterprisePrivateKey: string;
  rewardPrivateKey: string;
};

type PrivateKey<T extends DerivationTypeUnion> =
  T extends GetDerivationTypeUnion<"adaBase"> ? AdaBasePrivateKey : CommonPrivateKey;

export { type PrivateKey, type CommonPrivateKey, type AdaBasePrivateKey };
