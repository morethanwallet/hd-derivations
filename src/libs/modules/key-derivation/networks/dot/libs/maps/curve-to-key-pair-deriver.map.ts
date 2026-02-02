import {
  secp256k1PairFromSeed,
  ed25519PairFromSeed,
  sr25519PairFromSeed,
} from "@polkadot/util-crypto";
import type { Keypair } from "@polkadot/util-crypto/types";

import type { Curve } from "@/libs/enums/enums.js";

const curveToKeyPairDeriver: Record<
  Curve["ED25519"] | Curve["SECP256K1"] | Curve["SR25519"],
  (seed: Uint8Array) => Keypair
> = {
  secp256k1: (seed) => secp256k1PairFromSeed(seed),
  ed25519: (seed) => ed25519PairFromSeed(seed),
  sr25519: (seed) => sr25519PairFromSeed(seed),
};

export { curveToKeyPairDeriver };
