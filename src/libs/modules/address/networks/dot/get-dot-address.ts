import { encodeAddress } from "@polkadot/util-crypto";
import type { Ss58Format } from "./libs/types/index.js";
import { toUint8Array } from "@/libs/helpers/index.js";

function getDotAddress(publicKey: string, ss58Format: Ss58Format["ss58Format"]) {
  const rawPublicKey = toUint8Array(Buffer.from(publicKey, "hex"));

  return encodeAddress(rawPublicKey, ss58Format);
}

export { getDotAddress };
