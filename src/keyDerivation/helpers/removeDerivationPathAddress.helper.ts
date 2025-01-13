import { DERIVATION_PATH_DELIMITER } from "@/constants/index.js";
import { getDerivationPathSegmentsArray } from "@/helpers/index.js";

const ROOT_KEY_SYMBOL_START_INDEX = 0;
const ADDRESS_START_INDEX = -1;

function removeDerivationPathAddress(derivationPath: string): string {
  return getDerivationPathSegmentsArray(derivationPath)
    .slice(ROOT_KEY_SYMBOL_START_INDEX, ADDRESS_START_INDEX)
    .join(DERIVATION_PATH_DELIMITER);
}

export { removeDerivationPathAddress };
