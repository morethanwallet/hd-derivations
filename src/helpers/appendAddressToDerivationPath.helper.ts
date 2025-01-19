import { DERIVATION_PATH_DELIMITER } from "@/constants/index.js";
import { type DerivationPath } from "@/types/derivation/index.js";

function appendAddressToDerivationPath(
  derivationPath: DerivationPath["derivationPath"],
  addressIndex: number
): DerivationPath["derivationPath"] {
  return `${derivationPath}${DERIVATION_PATH_DELIMITER}${addressIndex}`;
}

export { appendAddressToDerivationPath };
