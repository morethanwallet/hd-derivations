import type { BIP32Interface, BIP32API } from "bip32";

type NonNullableBip32Interface = Omit<BIP32Interface, "privateKey"> & { privateKey: Uint8Array };

export type { NonNullableBip32Interface, BIP32Interface, BIP32API };
