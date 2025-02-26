import { blake2AsU8a, encodeAddress } from "@polkadot/util-crypto";
import type { Ss58Format } from "./libs/types/index.js";
import { convertHexToBytes } from "@/libs/utils/index.js";
import { secp256k1 } from "@noble/curves/secp256k1";
import { SECP256K1_COMPRESSED_PUBLIC_KEY_LENGTH } from "@/libs/constants/index.js";
import {
  PUBLIC_KEY_HASH_BIT_LENGTH,
  SECP256K1_UNCOMPRESSED_PUBLIC_KEY_LENGTH,
} from "./libs/constants/index.js";

function getDotAddress(publicKey: string, ss58Format: Ss58Format["ss58Format"]) {
  let publicKeyBytes = convertHexToBytes(publicKey);

  if (publicKeyBytes.length === SECP256K1_UNCOMPRESSED_PUBLIC_KEY_LENGTH) {
    publicKeyBytes = secp256k1.ProjectivePoint.fromHex(publicKeyBytes).toRawBytes(true);
  }

  if (publicKeyBytes.length === SECP256K1_COMPRESSED_PUBLIC_KEY_LENGTH) {
    publicKeyBytes = blake2AsU8a(publicKeyBytes, PUBLIC_KEY_HASH_BIT_LENGTH);
  }

  return encodeAddress(publicKeyBytes, ss58Format);
}

export { getDotAddress };
