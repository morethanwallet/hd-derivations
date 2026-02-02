import { DerivationPathSymbol } from "../enums/enums.js";

function getDerivationPathSegments(derivationPath: string): string[] {
  return derivationPath.split(DerivationPathSymbol.DELIMITER);
}

export { getDerivationPathSegments };
