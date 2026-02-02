import { DerivationPathSymbol } from "@/libs/enums/enums.js";
import type { CommonDerivationPath } from "@/libs/types/types.js";

function hardenDerivationPath(
  derivationPath: CommonDerivationPath["derivationPath"],
): CommonDerivationPath["derivationPath"] {
  return derivationPath.concat(DerivationPathSymbol.HARDENED_SUFFIX);
}

export { hardenDerivationPath };
