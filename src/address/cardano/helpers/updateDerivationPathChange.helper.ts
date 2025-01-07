import { DERIVATION_PATH_DELIMITER } from "@/constants/index.js";

function updateDerivationPathChange(derivationPath: string, change: number): string {
  const splittedPath = derivationPath.split(DERIVATION_PATH_DELIMITER);
  const changePositionIndex = 4;
  splittedPath[changePositionIndex] = String(change);

  return splittedPath.join(DERIVATION_PATH_DELIMITER);
}

export {updateDerivationPathChange}
