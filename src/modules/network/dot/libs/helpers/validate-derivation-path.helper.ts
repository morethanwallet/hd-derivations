import { ExceptionMessage } from "@/libs/enums/enums.js";
import { ValidationError } from "@/libs/exceptions";
import type { CommonDerivationPath } from "@/libs/types/types.js";

function validateDerivationPath(
  derivationPath: CommonDerivationPath["derivationPath"],
): void | never {
  const derivationPathPattern = /^(|\/\/?[^\/].*|\/\/\/.*)$/;

  if (derivationPath && !derivationPathPattern.test(derivationPath)) {
    throw new ValidationError(ExceptionMessage.INVALID_DERIVATION_PATH);
  }
}

export { validateDerivationPath };
