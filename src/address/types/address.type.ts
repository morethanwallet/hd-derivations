import { type KeyPair } from "./index.js";

type AddressData = {
  path: string;
  address: string;
  mnemonic: string;
} & KeyPair;

export { type AddressData };
