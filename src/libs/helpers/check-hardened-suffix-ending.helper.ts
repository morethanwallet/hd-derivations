import { DerivationPathSymbol } from "../enums/index.js";

const checkHardenedSuffixEnding = (segment: string) =>
  segment.endsWith(DerivationPathSymbol.HARDENED_SUFFIX);

export { checkHardenedSuffixEnding };
