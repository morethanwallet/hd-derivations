import type { Curve } from "@/libs/enums/enums";
import type { GetDerivationTypeUnion, DerivationTypeUnion } from "@/libs/types/types.js";

type DotBaseDeriveFromMnemonicParameters = {
  scheme: Curve["ED25519"] | Curve["SECP256K1"] | Curve["SR25519"],
};

type SuiDeriveFromMnemonicParameters = {
  scheme: Curve["ED25519"] | Curve["SECP256K1"] | Curve["SECP256R1"];
};

type HandlersCommonParameters<T extends DerivationTypeUnion> =
  T extends GetDerivationTypeUnion<"suiBase">
    ? SuiDeriveFromMnemonicParameters
    : T extends GetDerivationTypeUnion<"dotBase">
      ? DotBaseDeriveFromMnemonicParameters
      : Record<string, string>;

export type { HandlersCommonParameters };
