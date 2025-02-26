import type { Secp256k1DerivationConfig } from "./secp256k1-derivation-config.type.js";

type Secp256k1Config<T extends string, C extends string, S extends unknown = {}> = {
  [networkPurpose in T]: {
    [derivationType in C]: Secp256k1DerivationConfig & S;
  };
};

export type { Secp256k1Config };
