type SignatureSchemeUnion = "ed25519" | "secp256k1" | "secp256r1";

type SignatureSchemeProperty = { scheme: SignatureSchemeUnion };

export { type SignatureSchemeUnion, type SignatureSchemeProperty };
