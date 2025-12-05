import { DECIMAL_SYSTEM_IDENTIFIER, HARDEN_RANGE_START_INDEX } from "@/libs/constants/index.js";
import { DerivationPathSymbol } from "@/libs/enums/index.js";
import { ValidationError } from "@/libs/exceptions/index.js";
import {
  getDerivationPathSegmentsArray,
  checkHardenedSuffixEnding,
  hardenDerivationPathValue,
} from "@/libs/helpers/index.js";
import type { CommonDerivationPath } from "@/libs/types/types.js";
import { ExceptionMessage } from "./libs/enums/index.js";
import {
  validateDerivationPathLength,
  validateDerivationPathPattern,
} from "./libs/helpers/index.js";

function validateDerivationPath(
  derivationPath: CommonDerivationPath["derivationPath"],
  isHardenedPattern?: boolean,
): void | never {
  const maxNormalRangeIndex = HARDEN_RANGE_START_INDEX - 1;
  const maxHardenedRangeIndex = 4294967295; // 2 ** 32 - 1
  const purposeIndex = 1;
  validateDerivationPathLength(derivationPath);
  validateDerivationPathPattern(derivationPath, isHardenedPattern);
  const derivationPathSegmentsArray = getDerivationPathSegmentsArray(derivationPath);

  for (const segment of derivationPathSegmentsArray.slice(purposeIndex)) {
    const isHardened = checkHardenedSuffixEnding(segment);

    const numericSegmentValue = parseInt(
      segment.replace(DerivationPathSymbol.HARDENED_SUFFIX, ""),
      DECIMAL_SYSTEM_IDENTIFIER,
    );

    if (isNaN(numericSegmentValue)) {
      const invalidNumericSegmentExceptionMessage = `${ExceptionMessage.DERIVATION_PATH_SEGMENT_IS_INVALID}: ${segment}`;
      throw new ValidationError(invalidNumericSegmentExceptionMessage);
    }

    if (
      (isHardened && hardenDerivationPathValue(numericSegmentValue) > maxHardenedRangeIndex) ||
      (!isHardened && numericSegmentValue > maxNormalRangeIndex)
    ) {
      const outOfRangeSegmentExceptionMessage = `${ExceptionMessage.DERIVATION_PATH_SEGMENT_OUT_OF_RANGE}. ${
        isHardened ? "hardened" : "non-hardened"
      } derivation for segment: ${segment}`;

      throw new ValidationError(outOfRangeSegmentExceptionMessage);
    }
  }
}

export { validateDerivationPath };
