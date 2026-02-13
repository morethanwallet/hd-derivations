import { PublicKey } from "@stricahq/bip32ed25519";
import type { types } from "@stricahq/typhonjs";
import { HashType } from "@stricahq/typhonjs/dist/types.js";

import { convertHexToBytes } from "@/libs/utils/utils.js";

function getCredential(publicKey: string): types.Credential {
  const publicKeyInstance = new PublicKey(Buffer.from(convertHexToBytes(publicKey)));
  const keyHash = publicKeyInstance.hash();

  return { hash: keyHash, type: HashType.ADDRESS };
}

export { getCredential };
