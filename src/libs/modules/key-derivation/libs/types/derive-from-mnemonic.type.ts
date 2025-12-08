import type { CommonBipDerivationTypeUnion } from "./common-bip-derivation-type-union.type.js";
import type {
  DerivationTypeUnionByNetwork,
  DerivationPath,
  DerivationTypeUnion,
  KeyPair,
  GetSignatureSchemeUnion,
} from "@/libs/types/types.js";
import type { HandlersCommonParameters } from "./handlers-common-parameters.type.js";

type AptDeriveFromMnemonicParameters = {
  isLegacy: boolean;
  scheme: GetSignatureSchemeUnion<"ed25519" | "secp256k1" | "secp256r1">;
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
) => KeyPair<T>;

export {
  type DeriveFromMnemonic,
  type DeriveFromMnemonicParameters,
  type AptDeriveFromMnemonicParameters,
};
