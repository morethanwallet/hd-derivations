import { HARDENED_SUFFIX } from "@/libs/constants/index.js";

const checkHardenedSuffixEnding = (segment: string) => segment.endsWith(HARDENED_SUFFIX);

export { checkHardenedSuffixEnding };
