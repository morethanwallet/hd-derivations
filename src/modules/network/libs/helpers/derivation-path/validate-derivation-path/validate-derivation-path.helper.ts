import { ExceptionMessage } from "./libs/enums/index.js";
import {
  validateDerivationPathLength,
  validateDerivationPathPattern,
} from "./libs/helpers/index.js";

import { HARDENED_RANGE_OFFSET } from "@/libs/constants/index.js";
import { ValidationError } from "@/libs/exceptions/index.js";
import {
  getDerivationPathSegments,
  checkHardenedSuffixEnding,
  hardenDerivationPathValue,
} from "@/libs/helpers/helpers.js";
import type { CommonDerivationPath } from "@/libs/types/types.js";

function validateDerivationPath(
  derivationPath: CommonDerivationPath["derivationPath"],
  isHardenedPattern?: boolean,
): void | never {
  const maxNormalRangeIndex = HARDENED_RANGE_OFFSET - 1;
  const maxHardenedRangeIndex = 4294967295; // 2 ** 32 - 1
  const purposeIndex = 1;
  validateDerivationPathLength(derivationPath);
  validateDerivationPathPattern(derivationPath, isHardenedPattern);
  const derivationPathSegmentsArray = getDerivationPathSegments(derivationPath);

  for (const segment of derivationPathSegmentsArray.slice(purposeIndex)) {
    const isHardened = checkHardenedSuffixEnding(segment);

    const derivationPathSegmentValue = Number.parseInt(segment);

    if (isNaN(derivationPathSegmentValue)) {
      const invalidNumericSegmentExceptionMessage = `${ExceptionMessage.DERIVATION_PATH_SEGMENT_IS_INVALID}: ${segment}`;
      throw new ValidationError(invalidNumericSegmentExceptionMessage);
    }

    if (
      (isHardened &&
        hardenDerivationPathValue(derivationPathSegmentValue) > maxHardenedRangeIndex) ||
      (!isHardened && derivationPathSegmentValue > maxNormalRangeIndex)
    ) {
      const outOfRangeSegmentExceptionMessage = `${ExceptionMessage.DERIVATION_PATH_SEGMENT_OUT_OF_RANGE}. ${
        isHardened ? "hardened" : "non-hardened"
      } derivation for segment: ${segment}`;

      throw new ValidationError(outOfRangeSegmentExceptionMessage);
    }
  }
}

export { validateDerivationPath };
