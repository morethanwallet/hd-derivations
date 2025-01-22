import { DERIVATION_PATH_DELIMITER, HARDENED_SUFFIX } from "@/constants/index.js";
import { type DerivationPath } from "@/types/derivation/index.js";
import { type EllipticCurveAlgorithmUnion } from "@/types/index.js";

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
  const createdSegment = `${addressIndex}${algorithm === "ed25519" ? HARDENED_SUFFIX : ""}`;

  return `${derivationPath}${DERIVATION_PATH_DELIMITER}${createdSegment}`;
}

export { appendAddressToDerivationPath };
