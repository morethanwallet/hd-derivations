import { KeyDerivationError } from "../exceptions/exceptions.js";

import { type PrefixConfig, type Secp256k1Curve } from "@/libs/modules/curves/curves.js";
import { convertBytesToHex } from "@/libs/utils/index.js";
import { ExceptionMessage } from "@/libs/enums/enums.js";

function getKeyPairFromPrivateKeyBytes(
  privateKeyBytes: Uint8Array | undefined,
  secp256k1Curve: Secp256k1Curve,
  prefixConfig: PrefixConfig,
) {
  if (!privateKeyBytes) {
    throw new KeyDerivationError(ExceptionMessage.PRIVATE_KEY_GENERATION_FAILED);
  }

  const { privateKey, publicKey } = secp256k1Curve.getKeyPairFromPrivateKey(
    privateKeyBytes,
    prefixConfig,
  );

  if (!privateKey) {
    throw new KeyDerivationError(ExceptionMessage.PRIVATE_KEY_GENERATION_FAILED);
  }

  return {
    publicKey: convertBytesToHex(publicKey),
    privateKey: convertBytesToHex(privateKey),
  };
}

export { getKeyPairFromPrivateKeyBytes };
