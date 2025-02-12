import { encodeAddress } from "@polkadot/util-crypto";
import type { Ss58Format } from "./libs/types/index.js";
import { convertHexToBytes } from "@/libs/utils/index.js";

function getDotAddress(publicKey: string, ss58Format: Ss58Format["ss58Format"]) {
  const rawPublicKey = convertHexToBytes(publicKey);

  return encodeAddress(rawPublicKey, ss58Format);
}

export { getDotAddress };
