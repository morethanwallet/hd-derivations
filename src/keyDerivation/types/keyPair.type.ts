import { type DerivationTypeMap, type DerivationTypeUnion } from "@/types/index.js";

type CommonKeyPair = {
  publicKey: string;
  privateKey: string;
};

type CardanoBaseKeyPair = {
  enterprisePrivateKey: string;
  enterprisePublicKey: string;
  rewardPrivateKey: string;
  rewardPublicKey: string;
};

type KeyPair<TDerivationType extends DerivationTypeUnion> =
  TDerivationType extends DerivationTypeMap["adaBase"] ? CardanoBaseKeyPair : CommonKeyPair;

export { type CommonKeyPair, type CardanoBaseKeyPair, type KeyPair };
