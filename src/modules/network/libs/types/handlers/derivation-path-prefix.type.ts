import type {
  AdaBaseDerivationPath,
  CommonDerivationPath,
  DerivationTypeMap,
  DerivationTypeUnion,
} from "@/libs/types/index.js";

type CommonDerivationPathPrefix = {
  derivationPathPrefix: CommonDerivationPath["derivationPath"];
};

type AdaDerivationPathPrefix = {
  enterpriseDerivationPathPrefix: AdaBaseDerivationPath["enterpriseDerivationPath"];
  rewardDerivationPathPrefix: AdaBaseDerivationPath["rewardDerivationPath"];
};

type DerivationPathPrefix<T extends DerivationTypeUnion> = T extends DerivationTypeMap["adaBase"]
  ? AdaDerivationPathPrefix
  : CommonDerivationPathPrefix;

export type { DerivationPathPrefix, CommonDerivationPathPrefix };
