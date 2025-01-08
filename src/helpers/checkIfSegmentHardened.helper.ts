import { HARDENED_SUFFIX } from "@/constants/index.js";

const checkIfSegmentHardened = (segment: string) => segment.endsWith(HARDENED_SUFFIX);

export { checkIfSegmentHardened };
