import { type DerivationTypeMap } from "../derivation/derivation-type-map.type.js";
import { type DerivationTypeUnion } from "../derivation/derivation-type-union.type.js";
import { type CardanoBasePrivateKey, type CommonPrivateKey } from "./private-key.type.js";

type CommonKeyPair = { publicKey: string } & CommonPrivateKey;

type CardanoBaseKeyPair = {
  enterprisePublicKey: string;
  rewardPublicKey: string;
} & CardanoBasePrivateKey;

type KeyPair<TDerivationType extends DerivationTypeUnion> =
  TDerivationType extends DerivationTypeMap["adaBase"] ? CardanoBaseKeyPair : CommonKeyPair;

export { type CommonKeyPair, type CardanoBaseKeyPair, type KeyPair };
