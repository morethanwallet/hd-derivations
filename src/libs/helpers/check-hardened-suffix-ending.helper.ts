import { DerivationPathSymbol } from "../enums/enums.js";

const checkHardenedSuffixEnding = (segment: string) =>
  segment.endsWith(DerivationPathSymbol.HARDENED_SUFFIX);

export { checkHardenedSuffixEnding };
