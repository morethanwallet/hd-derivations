import type { SignatureSchemeUnion } from "@/libs/types/index.js";

type SuiConfig = {
  suiBase: {
    [key in SignatureSchemeUnion]: {
      derivationPathPrefix: string;
    };
  };
};

const suiConfig: SuiConfig = {
  suiBase: {
    ed25519: { derivationPathPrefix: "m/44'/784'/0'/0'" },
    secp256k1: { derivationPathPrefix: "m/54'784'/0'/0'" },
    secp256r1: { derivationPathPrefix: "m/74'784'/0'/0'" },
  },
};

export { suiConfig };
