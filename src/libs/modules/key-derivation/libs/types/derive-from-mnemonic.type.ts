import type { CommonBipDerivationTypeUnion } from "./common-bip-derivation-type-union.type.js";
import type {
  AptDerivationTypeUnion,
  DerivationPath,
  DerivationTypeUnion,
  KeyPair,
  EllipticCurveAlgorithmUnion,
} from "@/libs/types/index.js";
import type { HandlersCommonParameters } from "./handlers-common-parameters.type.js";

type AptDeriveFromMnemonicParameters = {
  isLegacy: boolean;
  algorithm: EllipticCurveAlgorithmUnion;
  isMultiSig?: boolean;
};

type DeriveFromMnemonicParameters<T extends DerivationTypeUnion> = DerivationPath<T> &
  (T extends CommonBipDerivationTypeUnion
    ? { base58RootKey?: string }
    : T extends AptDerivationTypeUnion
      ? AptDeriveFromMnemonicParameters
      : HandlersCommonParameters<T>);

type DeriveFromMnemonic<T extends DerivationTypeUnion> = (
  parameters: DeriveFromMnemonicParameters<T>,
) => KeyPair<T>;

export {
  type DeriveFromMnemonic,
  type DeriveFromMnemonicParameters,
  type AptDeriveFromMnemonicParameters,
};
