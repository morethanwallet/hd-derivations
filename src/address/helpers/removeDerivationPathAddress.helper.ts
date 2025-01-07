import { DERIVATION_PATH_DELIMITER } from "@/constants/index.js";

const ROOT_KEY_SYMBOL_START_INDEX = 0;
const ADDRESS_START_INDEX = -1;

function removeDerivationPathAddress(derivationPath: string): string {
  return derivationPath
    .split(DERIVATION_PATH_DELIMITER)
    .slice(ROOT_KEY_SYMBOL_START_INDEX, ADDRESS_START_INDEX)
    .join(DERIVATION_PATH_DELIMITER);
}

export { removeDerivationPathAddress };
