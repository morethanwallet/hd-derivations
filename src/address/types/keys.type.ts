import { type Network as KeysConfig } from "bitcoinjs-lib";

type KeyPair = {
  publicKey: string;
  privateKey: string;
};

export { type KeyPair, type KeysConfig };
