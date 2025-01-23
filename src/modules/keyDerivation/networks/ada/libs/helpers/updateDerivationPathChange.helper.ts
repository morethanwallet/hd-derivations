import { DERIVATION_PATH_DELIMITER } from "@/libs/constants/index.js";
import { getDerivationPathSegmentsArray } from "@/libs/helpers/index.js";

function updateDerivationPathChange(derivationPath: string, change: number): string {
  const pathSegmentsArray = getDerivationPathSegmentsArray(derivationPath);
  const changePositionIndex = 4;
  pathSegmentsArray[changePositionIndex] = String(change);

  return pathSegmentsArray.join(DERIVATION_PATH_DELIMITER);
}

export { updateDerivationPathChange };
