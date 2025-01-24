import type { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import type { Secp256r1Keypair } from "@mysten/sui/keypairs/secp256r1";
import type { Secp256k1Keypair } from "@mysten/sui/keypairs/secp256k1";

type KeyPairInstanceUnion =
  | Secp256k1Keypair
  | Secp256r1Keypair
  | Ed25519Keypair;

export type { KeyPairInstanceUnion };
