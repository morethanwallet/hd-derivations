import { blake2AsU8a, encodeAddress } from "@polkadot/util-crypto";
import { secp256k1 } from "@noble/curves/secp256k1.js";

import type { Ss58Format } from "./libs/types/index.js";
import {
  PUBLIC_KEY_HASH_BIT_LENGTH,
  SECP256K1_UNCOMPRESSED_PUBLIC_KEY_LENGTH,
} from "./libs/constants/index.js";

import { convertHexToBytes } from "@/libs/utils/utils.js";
import { SECP256K1_COMPRESSED_PUBLIC_KEY_LENGTH } from "@/libs/constants/index.js";

function getDotAddress(publicKey: string, ss58Format: Ss58Format["ss58Format"]) {
  let publicKeyBytes = convertHexToBytes(publicKey);
  const numericSs58Format = Number(ss58Format);

  if (publicKeyBytes.length === SECP256K1_UNCOMPRESSED_PUBLIC_KEY_LENGTH) {
    publicKeyBytes = secp256k1.Point.fromHex(publicKey).toBytes(true);
  }

  if (publicKeyBytes.length === SECP256K1_COMPRESSED_PUBLIC_KEY_LENGTH) {
    publicKeyBytes = blake2AsU8a(publicKeyBytes, PUBLIC_KEY_HASH_BIT_LENGTH);
  }

  return encodeAddress(publicKeyBytes, numericSs58Format);
}

export { getDotAddress };
