import { DERIVATION_PATH_DELIMITER } from "@/libs/constants/index.js";

function getDerivationPathSegmentsArray(path: string): string[] {
  return path.split(DERIVATION_PATH_DELIMITER);
}

export { getDerivationPathSegmentsArray };
