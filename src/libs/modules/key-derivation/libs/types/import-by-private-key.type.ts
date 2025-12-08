import type {
  PrivateKey,
  KeyPair,
  DerivationTypeUnion,
  DerivationTypeUnionByNetwork,
  GetSignatureSchemeUnion,
} from "@/libs/types/types.js";
import type { HandlersCommonParameters } from "./handlers-common-parameters.type.js";

type AptParameters = {
  isLegacy: boolean;
  scheme: GetSignatureSchemeUnion<"ed25519" | "secp256k1" | "secp256r1">;
};

type ImportByPrivateKeyParameters<T extends DerivationTypeUnion> = PrivateKey<T> &
  (T extends DerivationTypeUnionByNetwork["apt"] ? AptParameters : HandlersCommonParameters<T>);

type ImportByPrivateKey<T extends DerivationTypeUnion> = (
  parameters: ImportByPrivateKeyParameters<T>,
) => KeyPair<T>;

export type { ImportByPrivateKey, ImportByPrivateKeyParameters };
