import { DerivationPathSymbol } from "../enums/enums.js";

function getDerivationPathSegmentsArray(path: string): string[] {
  return path.split(DerivationPathSymbol.DELIMITER);
}

export { getDerivationPathSegmentsArray };
