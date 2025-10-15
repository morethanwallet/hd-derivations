import type { GetSignatureSchemeUnion } from "@/libs/types/types.js";

type SuiConfig = {
  suiBase: {
    [key in GetSignatureSchemeUnion<"ed25519" | "secp256k1" | "secp256r1">]: {
      derivationPathPrefix: string;
    };
  };
};

const suiConfig: SuiConfig = {
  suiBase: {
    ed25519: { derivationPathPrefix: "m/44'/784'/0'/0'" },
    secp256k1: { derivationPathPrefix: "m/54'/784'/0'/0" },
    secp256r1: { derivationPathPrefix: "m/74'/784'/0'/0" },
  },
};

export { suiConfig };
