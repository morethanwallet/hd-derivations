import { DECIMAL_SYSTEM_IDENTIFIER, HARDEN_RANGE_START_INDEX } from "@/libs/constants/index.js";
import { DerivationPathSymbol, ExceptionMessage } from "@/libs/enums/index.js";
import { hardenDerivationPathValue } from "./hardenDerivationPathValue.helper.js";
import { getDerivationPathSegmentsArray } from "./getDerivationPathSegmentsArray.helper.js";
import { checkHardenedSuffixEnding } from "./checkHardenedSuffixEnding.helper.js";

function validateDerivationPath(path: string): void | never {
  const invalidPathLength = 0;
  const masterKeySymbolIndex = 0;
  const delimiterIndex = 1;
  const maxDepth = 255;
  const maxNormalRangeIndex = HARDEN_RANGE_START_INDEX - 1;
  const maxHardenedRangeIndex = 4294967295; // 2 ** 32 - 1
  const purposeIndex = 1;
  const validSegmentSymbols = /^[0-9]+'?$/g;
  const maxInvalidCharactersLength = 0;

  if (
    path.length <= invalidPathLength ||
    path[masterKeySymbolIndex] !== DerivationPathSymbol.MASTER_KEY ||
    path[delimiterIndex] !== DerivationPathSymbol.DELIMITER
  ) {
    throw new Error(ExceptionMessage.INVALID_DERIVATION_PATH);
  }

  const pathSegmentsArray = getDerivationPathSegmentsArray(path);
  if (pathSegmentsArray.length > maxDepth) {
    throw new Error(`Derivation path depth exceeds ${maxDepth}`);
  }

  for (let depth = purposeIndex; depth < pathSegmentsArray.length; depth++) {
    const segment = pathSegmentsArray[depth];
    if (!segment) throw new Error(ExceptionMessage.INVALID_DERIVATION_PATH); // If the path has two slashes (//), this throws an error
    const invalidChars = segment.replace(validSegmentSymbols, "");

    if (invalidChars.length > maxInvalidCharactersLength) {
      throw new Error(`Derivation path has invalid characters at depth ${depth}: ${invalidChars}`);
    }

    const isHardened = checkHardenedSuffixEnding(segment);

    const numericIndexValue = isHardened
      ? parseInt(
          segment.replace(DerivationPathSymbol.HARDENED_SUFFIX, ""),
          DECIMAL_SYSTEM_IDENTIFIER
        )
      : parseInt(segment, DECIMAL_SYSTEM_IDENTIFIER);

    if (isNaN(numericIndexValue)) {
      throw new Error(`Derivation path has invalid number at depth ${depth}: ${segment}`);
    }

    if (
      (isHardened && hardenDerivationPathValue(numericIndexValue) > maxHardenedRangeIndex) ||
      (!isHardened && numericIndexValue > maxNormalRangeIndex)
    ) {
      throw new Error(
        `Segment ${segment} at depth ${depth} is out of the range for ${
          isHardened ? "hardened" : "non-hardened"
        } derivation`
      );
    }
  }
}

export { validateDerivationPath };
