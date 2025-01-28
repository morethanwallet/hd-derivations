import { DerivationPathSymbol } from "@/libs/enums/index.js";
import { getDerivationPathSegmentsArray } from "@/libs/helpers/index.js";

function updateDerivationPathChange(derivationPath: string, change: number): string {
  const pathSegmentsArray = getDerivationPathSegmentsArray(derivationPath);
  const changePositionIndex = 4;
  pathSegmentsArray[changePositionIndex] = String(change);

  return pathSegmentsArray.join(DerivationPathSymbol.DELIMITER);
}

export { updateDerivationPathChange };
