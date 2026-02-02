import { getDerivationPathSegments } from "@/libs/helpers/helpers.js";
import type { CommonDerivationPath } from "@/libs/types/types.js";

function getDerivationPathDepth(derivationPath: CommonDerivationPath["derivationPath"]): number {
  return getDerivationPathSegments(derivationPath).length;
}

export { getDerivationPathDepth };
