import { type DerivationType } from "@/enums/index.js";
import { type DerivationTypeUnion } from "@/types/index.js";

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
  TDerivationType extends typeof DerivationType.ADA_BASE ? CardanoBaseKeyPair : CommonKeyPair;

export { type KeyPair, type CommonKeyPair, type CardanoBaseKeyPair };
