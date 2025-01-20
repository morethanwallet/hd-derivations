import { DERIVATION_PATH_DELIMITER } from "@/constants/index.js";
import { DerivationPath } from "@/types/derivation/derivationPath.type.js";

const SEGMENT_INITIAL_VALUE = "0";

function increaseDerivationPathDepth(
  derivationPath: DerivationPath["derivationPath"]
): DerivationPath["derivationPath"] {
  return `${derivationPath}${DERIVATION_PATH_DELIMITER}${SEGMENT_INITIAL_VALUE}`;
}

export { increaseDerivationPathDepth };
