type SignatureSchemeUnion = "ed25519" | "secp256k1" | "secp256r1" | "sr25519";

type GetSignatureSchemeUnion<T extends SignatureSchemeUnion> = T;

export type { SignatureSchemeUnion, GetSignatureSchemeUnion };
