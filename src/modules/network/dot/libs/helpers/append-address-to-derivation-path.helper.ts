import type { CommonDerivationPath } from "@/libs/types/types.js";
import { DerivationPathSymbol } from "@/libs/enums/enums.js";

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
  const createdSegment = `${shouldHarden ? DerivationPathSymbol.DOT_HARDENED_DELIMITER : DerivationPathSymbol.DOT_SOFT_DELIMITER}${addressIndex}`;

  return `${derivationPath}${createdSegment}`;
}

export { appendAddressToDerivationPath };
