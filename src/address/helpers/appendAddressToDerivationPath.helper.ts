import { DERIVATION_PATH_DELIMITER } from "../constants/index.js";

function appendAddressToDerivationPath(derivationPath: string, addressIndex: number): string {
  return `${derivationPath}${DERIVATION_PATH_DELIMITER}${addressIndex}`;
}

export { appendAddressToDerivationPath };
