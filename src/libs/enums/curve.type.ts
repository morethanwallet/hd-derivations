import type { ValueOf } from "../types/value-of.type";

const Curve = {
  ED25519: "ed25519",
  SECP256K1: "secp256k1",
  SECP256R1: "secp256r1",
  SR25519: "sr25519",
} as const;

type Curve = typeof Curve;

type CurveUnion = ValueOf<Curve>;

export { Curve, type CurveUnion };
