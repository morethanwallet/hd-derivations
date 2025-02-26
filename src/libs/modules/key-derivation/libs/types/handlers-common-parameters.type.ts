import type {
  GetDerivationTypeUnion,
  DerivationTypeUnion,
  GetSignatureSchemeUnion,
} from "@/libs/types/index.js";

type DotBaseDeriveFromMnemonicParameters = {
  scheme: GetSignatureSchemeUnion<"ed25519" | "secp256k1" | "sr25519">;
};

type SuiDeriveFromMnemonicParameters = {
  scheme: GetSignatureSchemeUnion<"ed25519" | "secp256k1" | "secp256r1">;
};

type HandlersCommonParameters<T extends DerivationTypeUnion> =
  T extends GetDerivationTypeUnion<"suiBase">
    ? SuiDeriveFromMnemonicParameters
    : T extends GetDerivationTypeUnion<"dotBase">
      ? DotBaseDeriveFromMnemonicParameters
      : Record<string, string>;

export type { HandlersCommonParameters };
