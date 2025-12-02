import type {
  GetDerivationTypeUnion,
  DerivationTypeUnion,
} from "../derivation/derivation-type-union.type.js";
import { type AdaBasePrivateKey, type CommonPrivateKey } from "./private-key.type.js";

type CommonKeyPair = { publicKey: string } & CommonPrivateKey;

type AdaBaseKeyPair = {
  enterprisePublicKey: string;
  rewardPublicKey: string;
} & AdaBasePrivateKey;

type KeyPair<T extends DerivationTypeUnion> =
  T extends GetDerivationTypeUnion<"adaBase"> ? AdaBaseKeyPair : CommonKeyPair;

export { type CommonKeyPair, type AdaBaseKeyPair, type KeyPair };
