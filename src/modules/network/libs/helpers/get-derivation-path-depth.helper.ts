import { getDerivationPathSegmentsArray } from "@/libs/helpers";
import type { CommonDerivationPath } from "@/libs/types/types.js";

function getDerivationPathDepth(derivationPath: CommonDerivationPath["derivationPath"]): number {
  return getDerivationPathSegmentsArray(derivationPath).length;
}

export { getDerivationPathDepth };
