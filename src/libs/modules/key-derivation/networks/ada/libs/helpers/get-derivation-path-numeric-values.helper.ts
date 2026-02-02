import { SplittedDerivationPathItemIndex } from "@/libs/enums/enums.js";
import {
  checkHardenedSuffixEnding,
  getDerivationPathSegments,
  hardenDerivationPathValue,
} from "@/libs/helpers/helpers.js";

function getNumericDerivationPathSegmentValue(derivationPathSegment: string): number {
  const shouldAddHardenedOffset = checkHardenedSuffixEnding(derivationPathSegment);
  const derivationPathSegmentValue = Number.parseInt(derivationPathSegment);

  return shouldAddHardenedOffset
    ? hardenDerivationPathValue(derivationPathSegmentValue)
    : derivationPathSegmentValue;
}

function getDerivationPathNumericValues(derivationPath: string): number[] {
  const derivationPathSegments = getDerivationPathSegments(derivationPath);

  const derivationPathSegmentsWithoutMasterKey = derivationPathSegments.slice(
    SplittedDerivationPathItemIndex.PURPOSE_START,
  );

  return derivationPathSegmentsWithoutMasterKey.map(getNumericDerivationPathSegmentValue);
}

export { getDerivationPathNumericValues };
