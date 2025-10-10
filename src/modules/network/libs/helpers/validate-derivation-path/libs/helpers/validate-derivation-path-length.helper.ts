import { ValidationError } from "@/libs/exceptions/index.js";
import type { CommonDerivationPath } from "@/libs/types/types.js";
import { ExceptionMessage } from "@/libs/enums/index.js";

const INVALID_DERIVATION_PATH_LENGTH = 0;

function validateDerivationPathLength(
  derivationPath: CommonDerivationPath["derivationPath"],
): void | never {
  if (derivationPath.length <= INVALID_DERIVATION_PATH_LENGTH) {
    throw new ValidationError(ExceptionMessage.INVALID_DERIVATION_PATH);
  }
}

export { validateDerivationPathLength };
