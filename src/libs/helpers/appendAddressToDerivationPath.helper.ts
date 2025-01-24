import type {
  DerivationPath,
  SignatureSchemeUnion,
} from "@/libs/types/index.js";
import { DerivationPathSymbol } from "../enums/index.js";

type AppendAddressToDerivationPathParameters = {
  derivationPath: DerivationPath["derivationPath"];
  addressIndex: number;
  scheme?: SignatureSchemeUnion;
};

function appendAddressToDerivationPath({
  derivationPath,
  addressIndex,
  scheme = "secp256k1",
}: AppendAddressToDerivationPathParameters): DerivationPath["derivationPath"] {
  const createdSegment = `${addressIndex}${
    scheme === "ed25519" ? DerivationPathSymbol.HARDENED_SUFFIX : ""
  }`;

  return `${derivationPath}${DerivationPathSymbol.DELIMITER}${createdSegment}`;
}

export { appendAddressToDerivationPath };
