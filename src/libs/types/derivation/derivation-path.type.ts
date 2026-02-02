import type { DerivationTypeUnion, GetDerivationTypeUnion } from "./derivation-type-union.type.js";

type CommonDerivationPath = {
  derivationPath: string;
};

type AdaBaseDerivationPath = {
  enterpriseDerivationPath: string;
  rewardDerivationPath: string;
};

type DerivationPath<T extends DerivationTypeUnion> =
  T extends GetDerivationTypeUnion<"adaBase" | "adaLedger">
    ? AdaBaseDerivationPath
    : CommonDerivationPath;

export type { CommonDerivationPath, AdaBaseDerivationPath, DerivationPath };
