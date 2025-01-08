import { HARDEN_RANGE_START_INDEX } from "@/constants/index.js";

const hardenDerivationPathValue = (number: number): number => HARDEN_RANGE_START_INDEX + number;

export { hardenDerivationPathValue };
