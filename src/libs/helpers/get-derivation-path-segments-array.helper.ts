import { DerivationPathSymbol } from "../enums/index.js";

function getDerivationPathSegmentsArray(path: string): string[] {
  return path.split(DerivationPathSymbol.DELIMITER);
}

export { getDerivationPathSegmentsArray };
