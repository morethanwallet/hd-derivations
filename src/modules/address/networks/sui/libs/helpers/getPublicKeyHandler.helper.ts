import { ExceptionMessage } from "@/libs/enums/index.js";
import { AddressError } from "@/libs/exceptions/index.js";
import type { SignatureSchemeUnion } from "@/libs/types/index.js";
import { Ed25519PublicKey } from "@mysten/sui/keypairs/ed25519";
import { Secp256k1PublicKey } from "@mysten/sui/keypairs/secp256k1";
import { Secp256r1PublicKey } from "@mysten/sui/keypairs/secp256r1";
import type { PublicKeyHandlerUnion } from "../types/index.js";

function getPublicKeyHandler(scheme: SignatureSchemeUnion): PublicKeyHandlerUnion {
  switch (scheme) {
    case "secp256k1":
      return Secp256k1PublicKey;
    case "secp256r1":
      return Secp256r1PublicKey;
    case "ed25519":
      return Ed25519PublicKey;
    default:
      throw new AddressError(ExceptionMessage.INVALID_SCHEME);
  }
}

export { getPublicKeyHandler };
