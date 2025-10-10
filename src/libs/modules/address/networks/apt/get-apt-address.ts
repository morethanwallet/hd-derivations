import { MINIMUM_MULTISIG_ADDRESS_SIGNATURES_AMOUNT } from "@/libs/constants";
import { ExceptionMessage } from "@/libs/enums/index.js";
import { AddressError } from "@/libs/modules/address/libs/exceptions/index.js";
import type { CommonKeyPair, GetSignatureSchemeUnion } from "@/libs/types/types.js";
import {
  addHexPrefix,
  convertBytesToHex,
  convertHexToBytes,
  removeHexPrefix,
} from "@/libs/utils/index.js";
import { AnyPublicKey, Ed25519PublicKey, MultiKey, Secp256k1PublicKey } from "@aptos-labs/ts-sdk";
import { sha3_256 } from "@noble/hashes/sha3";

const ED25519_LEGACY_PUBLIC_KEY_START_INDEX = 2;
const SECP256K1_BYTES_PUBLIC_KEY_START_INDEX = 2;

function getAptAddress(
  publicKey: CommonKeyPair["publicKey"],
  isLegacy: boolean,
  scheme: GetSignatureSchemeUnion<"ed25519" | "secp256k1" | "secp256r1">,
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

    const secp256r1KeyTypePrefix = 0x02;
    const singleKeyAuthenticationValue = 0x02;

    const formattedPublicKeyBuffer = Buffer.concat([
      Buffer.from([secp256r1KeyTypePrefix]),
      publicKeyBytes,
      Buffer.from([singleKeyAuthenticationValue]),
    ]);

    const publicKeyHash = sha3_256(formattedPublicKeyBuffer);

    return addHexPrefix(convertBytesToHex(publicKeyHash));
  }

  if (!publicKeyInstance) throw new AddressError(ExceptionMessage.INVALID_SCHEME);

  return publicKeyInstance.authKey().toString();
}

export { getAptAddress };
