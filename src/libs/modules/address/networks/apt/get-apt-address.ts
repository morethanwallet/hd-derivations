import {
  AnyPublicKey,
  Ed25519PublicKey,
  MultiKey,
  Secp256k1PublicKey,
  Secp256r1PublicKey,
} from "@aptos-labs/ts-sdk";

import { MINIMUM_MULTISIG_ADDRESS_SIGNATURES_AMOUNT } from "@/libs/constants/index.js";
import { type Curve, ExceptionMessage } from "@/libs/enums/enums.js";
import { AddressError } from "@/libs/modules/address/libs/exceptions/index.js";
import type { CommonKeyPair } from "@/libs/types/types.js";
import { convertHexToBytes, removeHexPrefix } from "@/libs/utils/utils.js";

const ED25519_LEGACY_PUBLIC_KEY_START_INDEX = 2;
const SECP256K1_BYTES_PUBLIC_KEY_START_INDEX = 2;

function getAptAddress(
  publicKey: CommonKeyPair["publicKey"],
  isLegacy: boolean,
  scheme: Curve["ED25519"] | Curve["SECP256K1"] | Curve["SECP256R1"],
  isMultiSig?: boolean,
) {
  const prefixRemovedPublicKey = removeHexPrefix(publicKey);
  const publicKeyBytes = convertHexToBytes(prefixRemovedPublicKey);

  // TODO: Add the correct parsing logic when multi-signature will be implemented for multiple accounts
  const multiSigAdjustedPublicKeyBytes = isMultiSig ? publicKeyBytes.slice(3, -1) : publicKeyBytes;
  let publicKeyInstance: AnyPublicKey | Ed25519PublicKey | null = null;

  if (scheme === "ed25519") {
    const adjustedPublicKeyBytes =
      isMultiSig || isLegacy
        ? multiSigAdjustedPublicKeyBytes
        : multiSigAdjustedPublicKeyBytes.slice(ED25519_LEGACY_PUBLIC_KEY_START_INDEX);

    const ed25519PublicKeyInstance = new Ed25519PublicKey(adjustedPublicKeyBytes);

    publicKeyInstance = isLegacy
      ? ed25519PublicKeyInstance
      : new AnyPublicKey(ed25519PublicKeyInstance);
  }

  if (scheme === "secp256k1") {
    const adjustedPublicKeyBytes = isMultiSig
      ? multiSigAdjustedPublicKeyBytes
      : publicKeyBytes.slice(SECP256K1_BYTES_PUBLIC_KEY_START_INDEX);

    const secp256k1PublicKeyInstance = new Secp256k1PublicKey(adjustedPublicKeyBytes);

    publicKeyInstance = new AnyPublicKey(secp256k1PublicKeyInstance);
  }

  if (isMultiSig && scheme !== "secp256r1") {
    if (!publicKeyInstance) throw new AddressError(ExceptionMessage.INVALID_SCHEME);

    const multiSigPublicKey = new MultiKey({
      publicKeys: [publicKeyInstance],
      signaturesRequired: MINIMUM_MULTISIG_ADDRESS_SIGNATURES_AMOUNT,
    });

    return multiSigPublicKey.authKey().toString();
  }

  if (scheme === "secp256r1") {
    const publicKeyBytes = convertHexToBytes(prefixRemovedPublicKey);
    const publicKey = new Secp256r1PublicKey(publicKeyBytes);
    const authKey = publicKey.authKey();

    return authKey.derivedAddress().toString();
  }

  if (!publicKeyInstance) throw new AddressError(ExceptionMessage.INVALID_SCHEME);

  return publicKeyInstance.authKey().toString();
}

export { getAptAddress };
