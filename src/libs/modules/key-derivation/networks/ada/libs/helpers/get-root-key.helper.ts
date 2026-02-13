import { Bip32PrivateKey } from "@stricahq/bip32ed25519";

import { convertHexToBytes } from "@/libs/utils/utils.js";
import type { Mnemonic } from "@/libs/modules/mnemonic/mnemonic.js";

async function getRootKey(mnemonic: Mnemonic): Promise<Bip32PrivateKey> {
  const entropy = mnemonic.getEntropy();
  const entropyBytes = convertHexToBytes(entropy);
  const rootKey = await Bip32PrivateKey.fromEntropy(Buffer.from(entropyBytes));

  return rootKey;
}

export { getRootKey };
