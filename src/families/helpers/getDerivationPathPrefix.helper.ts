import { DERIVATION_PATH_DELIMITER } from "@/constants/index.js";
import { SplittedDerivationPathItemIndex } from "@/enums/index.js";
import { type DerivationPath } from "@/types/derivation/index.js";

function getDerivationPathPrefix(
  derivationPath: DerivationPath["derivationPath"]
): DerivationPath["derivationPath"] {
  return derivationPath
    .split(DERIVATION_PATH_DELIMITER)
    .slice(SplittedDerivationPathItemIndex.MASTER_START, SplittedDerivationPathItemIndex.COIN_END)
    .join(DERIVATION_PATH_DELIMITER);
}

export { getDerivationPathPrefix };
