import type { DerivationTypeUnion } from "./derivation-type-union.type";

type CommonDerivationPath = {
  derivationPath: string;
};

type AdaBaseDerivationPath = {
  enterpriseDerivationPath: string;
  rewardDerivationPath: string;
};

type DerivationPath<T extends DerivationTypeUnion> = T extends "adaBase"
  ? AdaBaseDerivationPath
  : CommonDerivationPath;

export type { CommonDerivationPath, AdaBaseDerivationPath, DerivationPath };
