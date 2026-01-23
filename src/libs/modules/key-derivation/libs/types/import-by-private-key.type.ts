import type {
  PrivateKey,
  KeyPair,
  DerivationTypeUnion,
  DerivationTypeUnionByNetwork,
} from "@/libs/types/types.js";
import type { HandlersCommonParameters } from "./handlers-common-parameters.type.js";
import type { Curve } from "@/libs/enums/enums.js";

type AptParameters = {
  isLegacy: boolean;
  scheme: Curve["ED25519"] | Curve["SECP256K1"] | Curve["SECP256R1"];
};

type ImportByPrivateKeyParameters<T extends DerivationTypeUnion> = PrivateKey<T> &
  (T extends DerivationTypeUnionByNetwork["apt"] ? AptParameters : HandlersCommonParameters<T>);

type ImportByPrivateKey<T extends DerivationTypeUnion> = (
  parameters: ImportByPrivateKeyParameters<T>,
) => KeyPair<T>;

export type { ImportByPrivateKey, ImportByPrivateKeyParameters };
