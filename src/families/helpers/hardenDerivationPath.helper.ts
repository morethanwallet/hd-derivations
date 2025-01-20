import { HARDENED_SUFFIX } from "@/constants/index.js";
import { type DerivationPath } from "@/types/derivation/index.js";

function hardenDerivationPath(
  derivationPath: DerivationPath["derivationPath"]
): DerivationPath["derivationPath"] {
  return derivationPath.concat(HARDENED_SUFFIX);
}

export { hardenDerivationPath };
