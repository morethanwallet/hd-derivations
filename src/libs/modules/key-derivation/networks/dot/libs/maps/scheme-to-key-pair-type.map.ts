import type { GetSignatureSchemeUnion } from "@/libs/types/index.js";
import type { KeypairType } from "@polkadot/util-crypto/types";

const schemeToKeyPairType: Record<
  GetSignatureSchemeUnion<"ed25519" | "secp256k1" | "sr25519">,
  KeypairType
> = {
  ed25519: "ed25519",
  secp256k1: "ecdsa",
  sr25519: "sr25519",
};

export { schemeToKeyPairType };
