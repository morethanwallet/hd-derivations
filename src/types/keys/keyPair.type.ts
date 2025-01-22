import { type DerivationTypeMap, type DerivationTypeUnion } from "../derivation/index.js";
import { type CardanoBasePrivateKey, type CommonPrivateKey } from "./privateKey.type.js";

type CommonKeyPair = { publicKey: string } & CommonPrivateKey;

type CardanoBaseKeyPair = {
  enterprisePublicKey: string;
  rewardPublicKey: string;
} & CardanoBasePrivateKey;

type KeyPair<TDerivationType extends DerivationTypeUnion> =
  TDerivationType extends DerivationTypeMap["adaBase"] ? CardanoBaseKeyPair : CommonKeyPair;

export { type CommonKeyPair, type CardanoBaseKeyPair, type KeyPair };
