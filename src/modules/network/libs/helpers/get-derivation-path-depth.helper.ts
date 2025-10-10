import { DerivationPathSymbol } from "@/libs/enums/index.js";
import { CommonDerivationPath } from "@/libs/types/types.js";

function getDerivationPathDepth(derivationPath: CommonDerivationPath["derivationPath"]): number {
  return derivationPath.split(DerivationPathSymbol.DELIMITER).length;
}

export { getDerivationPathDepth };
