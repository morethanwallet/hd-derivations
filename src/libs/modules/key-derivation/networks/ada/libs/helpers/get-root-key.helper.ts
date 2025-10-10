import { convertHexToBytes } from "@/libs/utils";
import { Bip32PrivateKey } from "@emurgo/cardano-serialization-lib-nodejs";

const EMPTY_PASSWORD = "";

function getRootKey(entropy: string): Bip32PrivateKey {
  const entropyBytes = convertHexToBytes(entropy);

  return Bip32PrivateKey.from_bip39_entropy(entropyBytes, convertHexToBytes(EMPTY_PASSWORD));
}

export { getRootKey };
