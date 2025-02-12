import { ValidationError } from "@/libs/exceptions/index.js";
import { ExceptionMessage } from "../enums/index.js";
import type { CommonDerivationPath } from "@/libs/types/index.js";

function validateDerivationPathPattern(
  derivationPath: CommonDerivationPath["derivationPath"],
  isStrictHardenedPattern?: boolean,
): void | never {
  const strictHardenedDerivationPathPattern = /^m(\/\d+'){1,254}$/;
  const simpleDerivationPathPattern = /^m(\/\d+'?){1,254}$/;

  if (isStrictHardenedPattern && !strictHardenedDerivationPathPattern.test(derivationPath)) {
    throw new ValidationError(ExceptionMessage.INVALID_DERIVATION_PATH);
  }

  if (!simpleDerivationPathPattern.test(derivationPath)) {
    throw new ValidationError(ExceptionMessage.INVALID_DERIVATION_PATH);
  }
}

export { validateDerivationPathPattern };
