import { DerivationPathSymbol } from "../enums/enums.js";

const checkHardenedSuffixEnding = (segment: string): boolean => {
  return segment.endsWith(DerivationPathSymbol.HARDENED_SUFFIX);
};

export { checkHardenedSuffixEnding };
