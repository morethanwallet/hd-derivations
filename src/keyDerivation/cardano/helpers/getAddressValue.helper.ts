import { getDerivationPathSegmentsArray } from "@/helpers/index.js";

const ADDRESS_INDEX = -1;

function getAddressValue(derivationPath: string): number {
  return Number(getDerivationPathSegmentsArray(derivationPath).slice(ADDRESS_INDEX).pop());
}

export { getAddressValue };
