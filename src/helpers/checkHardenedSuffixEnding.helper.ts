import { HARDENED_SUFFIX } from "@/constants/index.js";

const checkHardenedSuffixEnding = (segment: string) => segment.endsWith(HARDENED_SUFFIX);

export { checkHardenedSuffixEnding };
