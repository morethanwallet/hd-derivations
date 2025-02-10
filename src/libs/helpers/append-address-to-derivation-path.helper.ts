import type { CommonDerivationPath } from "@/libs/types/index.js";
import { DerivationPathSymbol } from "../enums/index.js";

type AppendAddressToDerivationPathParameters = {
  derivationPath: CommonDerivationPath["derivationPath"];
  addressIndex: number;
  shouldHarden?: boolean;
};

function appendAddressToDerivationPath({
  derivationPath,
  addressIndex,
  shouldHarden = false,
}: AppendAddressToDerivationPathParameters): CommonDerivationPath["derivationPath"] {
  const createdSegment = `${addressIndex}${
    shouldHarden ? DerivationPathSymbol.HARDENED_SUFFIX : ""
  }`;

  return `${derivationPath}${DerivationPathSymbol.DELIMITER}${createdSegment}`;
}

export { appendAddressToDerivationPath };
