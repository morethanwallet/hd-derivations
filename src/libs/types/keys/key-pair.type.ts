import { type DerivationTypeMap } from "../derivation/derivation-type-map.type.js";
import { type DerivationTypeUnion } from "../derivation/derivation-type-union.type.js";
import { type AdaBasePrivateKey, type CommonPrivateKey } from "./private-key.type.js";

type CommonKeyPair = { publicKey: string } & CommonPrivateKey;

type AdaBaseKeyPair = {
  enterprisePublicKey: string;
  rewardPublicKey: string;
} & AdaBasePrivateKey;

type KeyPair<TDerivationType extends DerivationTypeUnion> =
  TDerivationType extends DerivationTypeMap["adaBase"] ? AdaBaseKeyPair : CommonKeyPair;

export { type CommonKeyPair, type AdaBaseKeyPair, type KeyPair };
