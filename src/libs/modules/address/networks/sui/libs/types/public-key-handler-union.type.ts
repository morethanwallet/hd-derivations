import type { Ed25519PublicKey } from "@mysten/sui/keypairs/ed25519";
import type { Secp256k1PublicKey } from "@mysten/sui/keypairs/secp256k1";
import type { Secp256r1PublicKey } from "@mysten/sui/keypairs/secp256r1";

type PublicKeyHandlerUnion =
  | typeof Secp256k1PublicKey
  | typeof Secp256r1PublicKey
  | typeof Ed25519PublicKey;

export type { PublicKeyHandlerUnion };
