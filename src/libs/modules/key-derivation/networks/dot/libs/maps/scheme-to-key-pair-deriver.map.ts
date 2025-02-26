import type { GetSignatureSchemeUnion } from "@/libs/types/index.js";
import {
  secp256k1PairFromSeed,
  ed25519PairFromSeed,
  sr25519PairFromSeed,
} from "@polkadot/util-crypto";
import type { Keypair } from "@polkadot/util-crypto/types";

const schemeToKeyPairDeriver: Record<
  GetSignatureSchemeUnion<"ed25519" | "secp256k1" | "sr25519">,
  (seed: Uint8Array) => Keypair
> = {
  secp256k1: (seed) => secp256k1PairFromSeed(seed),
  ed25519: (seed) => ed25519PairFromSeed(seed),
  sr25519: (seed) => sr25519PairFromSeed(seed),
};

export { schemeToKeyPairDeriver };
