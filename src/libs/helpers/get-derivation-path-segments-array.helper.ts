import { DerivationPathSymbol } from "../enums/enums.js";

function getDerivationPathSegmentsArray(derivationPath: string): string[] {
  return derivationPath.split(DerivationPathSymbol.DELIMITER);
}

export { getDerivationPathSegmentsArray };
