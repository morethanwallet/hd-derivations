import { DERIVATION_PATH_DELIMITER } from "@/constants/index.js";

const ADDRESS_INDEX = -1;

function getAddressValue(derivationPath: string): number {
  return Number(derivationPath.split(DERIVATION_PATH_DELIMITER).slice(ADDRESS_INDEX).pop());
}

export { getAddressValue };
