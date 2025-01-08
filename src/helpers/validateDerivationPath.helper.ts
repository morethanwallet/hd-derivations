import { DERIVATION_PATH_DELIMITER } from "@/constants/index.js";
import { ExceptionMessage } from "@/exceptions/index.js";

function validateDerivationPath(path: string): void | never {
  const invalidPathLength = 0;
  const masterKeySymbol = "m";
  const masterKeySymbolIndex = 0;
  const delimiterIndex = 1;
  const hardenedSuffix = "'";
  const maxDepth = 255;
  const hardenedRangeStartIndex = 2 ** 31;
  const maxNormalRangeIndex = hardenedRangeStartIndex - 1;
  const maxHardenedRangeIndex = 2 ** 32 - 1;
  const purposeIndex = 1;
  const validSegmentSymbols = /^[0-9]+'?$/g;
  const maxInvalidCharactersLength = 0;
  const decimalSystemIdentifier = 10;

  if (
    path.length <= invalidPathLength ||
    path[masterKeySymbolIndex] !== masterKeySymbol ||
    path[delimiterIndex] !== DERIVATION_PATH_DELIMITER
  ) {
    throw new Error(ExceptionMessage.INVALID_DERIVATION_PATH);
  }

  const pathSegmentsArray = path.split(DERIVATION_PATH_DELIMITER);
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

    const isHardened = segment.endsWith(hardenedSuffix);

    const numericIndexValue = isHardened
      ? parseInt(segment.replace(hardenedSuffix, ""), decimalSystemIdentifier)
      : parseInt(segment, decimalSystemIdentifier);

    if (isNaN(numericIndexValue)) {
      throw new Error(`Derivation path has invalid number at depth ${depth}: ${segment}`);
    }

    if (
      (isHardened && numericIndexValue + hardenedRangeStartIndex > maxHardenedRangeIndex) ||
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
