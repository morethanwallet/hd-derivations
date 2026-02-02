import { DerivationPathSymbol } from "../enums/enums.js";
import { getDerivationPathSegments } from "./get-derivation-path-segments.helper.js";

import type { CommonDerivationPath } from "@/libs/types/types.js";

type AppendAddressToDerivationPathParameters = {
  derivationPath: CommonDerivationPath["derivationPath"];
  addressIndex: number;
  shouldHarden?: boolean;
  addressPosition?: number;
};

const DELETION_SKIP_COUNT = 0;

function appendAddressToDerivationPath({
  derivationPath,
  addressIndex,
  shouldHarden = false,
  addressPosition,
}: AppendAddressToDerivationPathParameters): CommonDerivationPath["derivationPath"] {
  const createdSegment = `${addressIndex}${
    shouldHarden ? DerivationPathSymbol.HARDENED_SUFFIX : ""
  }`;

  const splittedDerivationPath = getDerivationPathSegments(derivationPath);
  const formattedAddressPosition = addressPosition ?? splittedDerivationPath.length;

  const addressInjectedDerivationPath = splittedDerivationPath.toSpliced(
    formattedAddressPosition,
    DELETION_SKIP_COUNT,
    createdSegment,
  );

  return addressInjectedDerivationPath.join(DerivationPathSymbol.DELIMITER);
}

export { appendAddressToDerivationPath };
