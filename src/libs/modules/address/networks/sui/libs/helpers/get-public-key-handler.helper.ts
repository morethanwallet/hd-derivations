import { Ed25519PublicKey } from "@mysten/sui/keypairs/ed25519";
import { Secp256k1PublicKey } from "@mysten/sui/keypairs/secp256k1";
import { Secp256r1PublicKey } from "@mysten/sui/keypairs/secp256r1";

import type { PublicKeyHandlerUnion } from "../types/index.js";

import { AddressError } from "@/libs/modules/address/libs/exceptions/index.js";
import { type Curve, ExceptionMessage } from "@/libs/enums/enums.js";

function getPublicKeyHandler(
  scheme: Curve["ED25519"] | Curve["SECP256K1"] | Curve["SECP256R1"],
): PublicKeyHandlerUnion {
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
