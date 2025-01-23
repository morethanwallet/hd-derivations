import type { DerivationPath, EllipticCurveAlgorithmUnion } from "@/libs/types/index.js";
import { DerivationPathSymbol } from "../enums/index.js";

type AppendAddressToDerivationPathParameters = {
  derivationPath: DerivationPath["derivationPath"];
  addressIndex: number;
  algorithm?: EllipticCurveAlgorithmUnion;
};

function appendAddressToDerivationPath({
  derivationPath,
  addressIndex,
  algorithm = "secp256k1",
}: AppendAddressToDerivationPathParameters): DerivationPath["derivationPath"] {
  const createdSegment = `${addressIndex}${
    algorithm === "ed25519" ? DerivationPathSymbol.HARDENED_SUFFIX : ""
  }`;

  return `${derivationPath}${DerivationPathSymbol.DELIMITER}${createdSegment}`;
}

export { appendAddressToDerivationPath };
