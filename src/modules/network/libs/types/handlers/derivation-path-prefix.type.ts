import type {
  AdaBaseDerivationPath,
  CommonDerivationPath,
  GetDerivationTypeUnion,
  DerivationTypeUnion,
} from "@/libs/types/index.js";

type CommonDerivationPathPrefix = {
  derivationPathPrefix: CommonDerivationPath["derivationPath"];
};

type AdaDerivationPathPrefix = {
  enterpriseDerivationPathPrefix: AdaBaseDerivationPath["enterpriseDerivationPath"];
  rewardDerivationPathPrefix: AdaBaseDerivationPath["rewardDerivationPath"];
};

type DerivationPathPrefix<T extends DerivationTypeUnion> =
  T extends GetDerivationTypeUnion<"adaBase">
    ? AdaDerivationPathPrefix
    : CommonDerivationPathPrefix;

export type { DerivationPathPrefix, CommonDerivationPathPrefix };
