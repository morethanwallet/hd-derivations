import { ExceptionMessage } from "@/libs/enums/index.js";
import { ValidationError } from "@/libs/exceptions";
import type { CommonDerivationPath } from "@/libs/types/index.js";

function validateDerivationPath(
  derivationPath: CommonDerivationPath["derivationPath"],
): void | never {
  const derivationPathPattern = /^(|\/\/?[^\/].*|\/\/\/.*)$/;

  if (derivationPath && !derivationPathPattern.test(derivationPath)) {
    throw new ValidationError(ExceptionMessage.INVALID_DERIVATION_PATH);
  }
}

export { validateDerivationPath };
