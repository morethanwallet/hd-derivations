import type { CommonBipDerivationTypeUnion } from "./common-bip-derivation-type-union.type.js";
import type { HandlersCommonParameters } from "./handlers-common-parameters.type.js";

import type {
  DerivationTypeUnionByNetwork,
  DerivationPath,
  DerivationTypeUnion,
  KeyPair,
} from "@/libs/types/types.js";
import type { Curve } from "@/libs/enums/enums.js";

type AptDeriveFromMnemonicParameters = {
  isLegacy: boolean;
  scheme: Curve["ED25519" | "SECP256K1" | "SECP256R1"];
  isMultiSig?: boolean;
};

type DeriveFromMnemonicParameters<T extends DerivationTypeUnion> = DerivationPath<T> &
  (T extends CommonBipDerivationTypeUnion
    ? { base58RootKey?: string }
    : T extends DerivationTypeUnionByNetwork["apt"]
      ? AptDeriveFromMnemonicParameters
      : HandlersCommonParameters<T>);

type DeriveFromMnemonic<T extends DerivationTypeUnion> = (
  parameters: DeriveFromMnemonicParameters<T>,
) => KeyPair<T> | Promise<KeyPair<T>>;

export {
  type DeriveFromMnemonic,
  type DeriveFromMnemonicParameters,
  type AptDeriveFromMnemonicParameters,
};
