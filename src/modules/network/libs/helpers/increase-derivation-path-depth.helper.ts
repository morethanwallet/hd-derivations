import { DerivationPathSymbol } from "@/libs/enums/index.js";
import { CommonDerivationPath } from "@/libs/types/types.js";

const SEGMENT_INITIAL_VALUE = "0";

type IncreaseDerivationPathDepthParameters = {
  derivationPath: CommonDerivationPath["derivationPath"];
  shouldHarden?: boolean;
};

function increaseDerivationPathDepth({
  derivationPath,
  shouldHarden = false,
}: IncreaseDerivationPathDepthParameters): CommonDerivationPath["derivationPath"] {
  const hardenedSuffix = shouldHarden ? DerivationPathSymbol.HARDENED_SUFFIX : "";
  return `${derivationPath}${DerivationPathSymbol.DELIMITER}${SEGMENT_INITIAL_VALUE}${hardenedSuffix}`;
}

export { increaseDerivationPathDepth };
