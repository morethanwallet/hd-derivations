import { ValidationError } from "@/libs/exceptions/index.js";
import { ExceptionMessage } from "@/libs/enums/index.js";
import type { CommonDerivationPath } from "@/libs/types/index.js";

function validateDerivationPathPattern(
  derivationPath: CommonDerivationPath["derivationPath"],
  isStrictHardenedPattern?: boolean,
): void | never {
  const strictHardenedDerivationPathPattern = /^m(\/\d+'){1,254}$/;
  const softDerivationPathPattern = /^m(\/\d+'?){1,254}$/;

  if (isStrictHardenedPattern && !strictHardenedDerivationPathPattern.test(derivationPath)) {
    throw new ValidationError(ExceptionMessage.INVALID_DERIVATION_PATH);
  }

  if (!softDerivationPathPattern.test(derivationPath)) {
    throw new ValidationError(ExceptionMessage.INVALID_DERIVATION_PATH);
  }
}

export { validateDerivationPathPattern };
