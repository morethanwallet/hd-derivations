import type { KeypairType } from "@polkadot/util-crypto/types";

import type { Curve } from "@/libs/enums/enums.js";

const curveToKeyPairType: Record<
  Curve["ED25519"] | Curve["SECP256K1"] | Curve["SR25519"],
  KeypairType
> = {
  ed25519: "ed25519",
  secp256k1: "ecdsa",
  sr25519: "sr25519",
};

export { curveToKeyPairType };
