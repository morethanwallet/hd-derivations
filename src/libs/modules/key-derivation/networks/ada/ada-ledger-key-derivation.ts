import { PrivateKey } from "@emurgo/cardano-serialization-lib-nodejs";
import { concatBytes, utf8ToBytes } from "@noble/hashes/utils.js";

import {
  encodeEd25519PointToBytes,
  getAdaLedgerExtendedPrivateKeyFromNode,
  getDerivationPathNumericValues,
  multiplyEd25519BasePointByScalar,
} from "./libs/helpers/helpers.js";
import {
  Ed25519PrivateKeyClamp,
  ExceptionMessage,
  LedgerDerivationHmacPrefix,
} from "./libs/enums/enums.js";
import {
  ED25519_CHILD_LEFT_KEY_MULTIPLIER,
  ED25519_EXTENDED_PRIVATE_KEY_LENGTH_BYTES,
  ED25519_KEY_PART_LENGTH_BYTES,
  ED25519_PUBLIC_KEY_LENGTH_BYTES,
  ED25519_RESEED_LOOP_THIRD_HIGHEST_BIT_MASK,
  ED25519_SEED_KEY_TEXT,
  ED25519_SUBGROUP_ORDER,
  LEDGER_CHAIN_CODE_LENGTH_BYTES,
  LEDGER_CHILD_Z_LEFT_LENGTH_BYTES,
  LEDGER_CHILD_Z_SKIP_LENGTH_BYTES,
  LEDGER_ROOT_CHAIN_CODE_PREFIX_BYTE,
  UINT256_MODULUS,
} from "./libs/constants/constants.js";
import {
  areUint8ArraysEqual,
  bigIntToBytesLittleEndian,
  bytesToBigIntLittleEndian,
  clearBits,
  hmacSha256,
  hmacSha512,
  setBits,
  toUint32LittleEndianBytes,
} from "./libs/utils/utils.js";
import { KeyDerivationError } from "../../libs/exceptions/exceptions.js";
import type { LedgerEd25519PrivateNode } from "./libs/types/types.js";

import type {
  ImportByPrivateKeyParameters,
  AbstractKeyDerivation,
  DeriveFromMnemonicParameters,
} from "@/libs/modules/key-derivation/libs/types/index.js";
import type { KeyPair } from "@/libs/types/types.js";
import { type Mnemonic } from "@/libs/modules/mnemonic/mnemonic.js";
import { HARDENED_RANGE_OFFSET } from "@/libs/constants/index.js";

class AdaLedgerKeyDerivation implements AbstractKeyDerivation<"adaLedger"> {
  private readonly mnemonic: Mnemonic;

  public constructor(mnemonic: Mnemonic) {
    this.mnemonic = mnemonic;
  }

  public deriveFromMnemonic(
    parameters: DeriveFromMnemonicParameters<"adaLedger">,
  ): KeyPair<"adaLedger"> {
    const seed = this.mnemonic.getSeed();

    const enterpriseNode = this.deriveNodeFromSeed(parameters.enterpriseDerivationPath, seed);
    const rewardNode = this.deriveNodeFromSeed(parameters.rewardDerivationPath, seed);

    const enterprisePrivateKey = getAdaLedgerExtendedPrivateKeyFromNode(enterpriseNode);
    const rewardPrivateKey = getAdaLedgerExtendedPrivateKeyFromNode(rewardNode);

    const enterprisePublicKey = enterprisePrivateKey.to_public();
    const rewardPublicKey = rewardPrivateKey.to_public();

    const derivedEnterprisePubBytes = enterprisePublicKey.as_bytes();
    const derivedRewardPubBytes = rewardPublicKey.as_bytes();

    if (derivedEnterprisePubBytes.length !== ED25519_PUBLIC_KEY_LENGTH_BYTES) {
      throw new KeyDerivationError(ExceptionMessage.FAILED_TO_FORMAT_BYTES);
    }

    if (derivedRewardPubBytes.length !== ED25519_PUBLIC_KEY_LENGTH_BYTES) {
      throw new KeyDerivationError(ExceptionMessage.FAILED_TO_FORMAT_BYTES);
    }

    if (!areUint8ArraysEqual(derivedEnterprisePubBytes, enterpriseNode.publicKeyBytes)) {
      throw new KeyDerivationError(ExceptionMessage.FAILED_TO_FORMAT_BYTES);
    }

    if (!areUint8ArraysEqual(derivedRewardPubBytes, rewardNode.publicKeyBytes)) {
      throw new KeyDerivationError(ExceptionMessage.FAILED_TO_FORMAT_BYTES);
    }

    return {
      enterprisePrivateKey: enterprisePrivateKey.to_hex(),
      enterprisePublicKey: enterprisePublicKey.to_hex(),
      rewardPrivateKey: rewardPrivateKey.to_hex(),
      rewardPublicKey: rewardPublicKey.to_hex(),
    };
  }

  public importByPrivateKey(
    parameters: ImportByPrivateKeyParameters<"adaLedger">,
  ): KeyPair<"adaLedger"> {
    const enterprisePrivateKey = PrivateKey.from_hex(parameters.enterprisePrivateKey);
    const rewardPrivateKey = PrivateKey.from_hex(parameters.rewardPrivateKey);

    const enterprisePublicKey = enterprisePrivateKey.to_public();
    const rewardPublicKey = rewardPrivateKey.to_public();

    return {
      enterprisePrivateKey: enterprisePrivateKey.to_hex(),
      enterprisePublicKey: enterprisePublicKey.to_hex(),
      rewardPrivateKey: rewardPrivateKey.to_hex(),
      rewardPublicKey: rewardPublicKey.to_hex(),
    };
  }

  private deriveRootNodeFromSeed(seedBytes: Uint8Array): LedgerEd25519PrivateNode {
    const seedKeyBytes = utf8ToBytes(ED25519_SEED_KEY_TEXT);

    const rootChainCodeBytes = hmacSha256(
      seedKeyBytes,
      concatBytes(new Uint8Array([LEDGER_ROOT_CHAIN_CODE_PREFIX_BYTE]), seedBytes),
    );

    if (rootChainCodeBytes.length !== LEDGER_CHAIN_CODE_LENGTH_BYTES) {
      throw new KeyDerivationError(ExceptionMessage.FAILED_TO_CREATE_HMAC512_HASH);
    }

    let intermediateHmacOutputBytes = hmacSha512(seedKeyBytes, seedBytes);

    let leftPrivateKeyBytes = intermediateHmacOutputBytes.slice(0, ED25519_KEY_PART_LENGTH_BYTES);
    let rightPrivateKeyBytes = intermediateHmacOutputBytes.slice(
      ED25519_KEY_PART_LENGTH_BYTES,
      ED25519_EXTENDED_PRIVATE_KEY_LENGTH_BYTES,
    );

    if (
      leftPrivateKeyBytes.length !== ED25519_KEY_PART_LENGTH_BYTES ||
      rightPrivateKeyBytes.length !== ED25519_KEY_PART_LENGTH_BYTES
    ) {
      throw new KeyDerivationError(ExceptionMessage.FAILED_TO_CREATE_HMAC512_HASH);
    }

    if (leftPrivateKeyBytes[31] === undefined) {
      throw new KeyDerivationError(ExceptionMessage.FAILED_TO_CREATE_HMAC512_HASH);
    }

    while ((leftPrivateKeyBytes[31]! & ED25519_RESEED_LOOP_THIRD_HIGHEST_BIT_MASK) !== 0) {
      seedBytes = intermediateHmacOutputBytes;

      intermediateHmacOutputBytes = hmacSha512(seedKeyBytes, seedBytes);

      leftPrivateKeyBytes = intermediateHmacOutputBytes.slice(0, ED25519_KEY_PART_LENGTH_BYTES);
      rightPrivateKeyBytes = intermediateHmacOutputBytes.slice(
        ED25519_KEY_PART_LENGTH_BYTES,
        ED25519_EXTENDED_PRIVATE_KEY_LENGTH_BYTES,
      );
    }

    const clampedLeftPrivateKeyBytes = leftPrivateKeyBytes.slice();

    if (
      clampedLeftPrivateKeyBytes[0] === undefined ||
      clampedLeftPrivateKeyBytes[31] === undefined
    ) {
      throw new KeyDerivationError(ExceptionMessage.FAILED_TO_CREATE_HMAC512_HASH);
    }

    clampedLeftPrivateKeyBytes[0] = clearBits(
      clampedLeftPrivateKeyBytes[0],
      Ed25519PrivateKeyClamp.LOW_3_BITS_MASK,
    );
    clampedLeftPrivateKeyBytes[31] = clearBits(
      clampedLeftPrivateKeyBytes[31],
      Ed25519PrivateKeyClamp.CLEAR_HIGHEST_BIT_MASK,
    );
    clampedLeftPrivateKeyBytes[31] = setBits(
      clampedLeftPrivateKeyBytes[31],
      Ed25519PrivateKeyClamp.SET_SECOND_HIGHEST_BIT_MASK,
    );

    const leftPrivateKeyScalar = bytesToBigIntLittleEndian(clampedLeftPrivateKeyBytes);
    const rootPublicPoint = multiplyEd25519BasePointByScalar(leftPrivateKeyScalar);
    const rootPublicKeyBytes = encodeEd25519PointToBytes(rootPublicPoint);

    if (rootPublicKeyBytes.length !== ED25519_PUBLIC_KEY_LENGTH_BYTES) {
      throw new KeyDerivationError(ExceptionMessage.FAILED_TO_CREATE_HMAC512_HASH);
    }

    return {
      leftPrivateKeyBytes: clampedLeftPrivateKeyBytes,
      rightPrivateKeyBytes,
      publicKeyBytes: rootPublicKeyBytes,
      chainCodeBytes: rootChainCodeBytes,
    };
  }

  private deriveNodeFromSeed(
    derivationPath: string,
    seedBytes: Uint8Array,
  ): LedgerEd25519PrivateNode {
    let currentNode = this.deriveRootNodeFromSeed(seedBytes);
    const derivationPathNumericValues = getDerivationPathNumericValues(derivationPath);

    for (const derivationPathNumericValue of derivationPathNumericValues) {
      currentNode = this.derivePrivateChildNode(currentNode, derivationPathNumericValue);
    }

    return currentNode;
  }

  private derivePrivateChildNode(
    parentNode: LedgerEd25519PrivateNode,
    childDerivationPathValue: number,
  ): LedgerEd25519PrivateNode {
    const { leftPrivateKeyBytes, rightPrivateKeyBytes, publicKeyBytes, chainCodeBytes } =
      parentNode;

    const childIndexBytes = toUint32LittleEndianBytes(childDerivationPathValue);

    const isHardenedDerivation = childDerivationPathValue >= HARDENED_RANGE_OFFSET;

    let hmacZOutputBytes: Uint8Array;
    let childChainCodeBytes: Uint8Array;

    if (!isHardenedDerivation) {
      hmacZOutputBytes = hmacSha512(
        chainCodeBytes,
        concatBytes(
          new Uint8Array([LedgerDerivationHmacPrefix.NON_HARDENED_Z]),
          publicKeyBytes,
          childIndexBytes,
        ),
      );

      childChainCodeBytes = hmacSha512(
        chainCodeBytes,
        concatBytes(
          new Uint8Array([LedgerDerivationHmacPrefix.NON_HARDENED_CHAIN_CODE]),
          publicKeyBytes,
          childIndexBytes,
        ),
      ).slice(32);
    } else {
      const concatenatedPrivateKeyBytes = concatBytes(leftPrivateKeyBytes, rightPrivateKeyBytes);

      hmacZOutputBytes = hmacSha512(
        chainCodeBytes,
        concatBytes(
          new Uint8Array([LedgerDerivationHmacPrefix.HARDENED_Z]),
          concatenatedPrivateKeyBytes,
          childIndexBytes,
        ),
      );

      childChainCodeBytes = hmacSha512(
        chainCodeBytes,
        concatBytes(
          new Uint8Array([LedgerDerivationHmacPrefix.HARDENED_CHAIN_CODE]),
          concatenatedPrivateKeyBytes,
          childIndexBytes,
        ),
      ).slice(32);
    }

    if (childChainCodeBytes.length !== LEDGER_CHAIN_CODE_LENGTH_BYTES) {
      throw new KeyDerivationError(ExceptionMessage.FAILED_TO_CREATE_HMAC512_HASH);
    }

    const zLeftBytes = hmacZOutputBytes.slice(0, LEDGER_CHILD_Z_LEFT_LENGTH_BYTES);

    const zRightBytes = hmacZOutputBytes.slice(
      LEDGER_CHILD_Z_LEFT_LENGTH_BYTES + LEDGER_CHILD_Z_SKIP_LENGTH_BYTES,
    );

    const zLeftValue = bytesToBigIntLittleEndian(zLeftBytes);
    const parentLeftPrivateKeyValue = bytesToBigIntLittleEndian(leftPrivateKeyBytes);

    const childLeftPrivateKeyValue =
      zLeftValue * ED25519_CHILD_LEFT_KEY_MULTIPLIER + parentLeftPrivateKeyValue;

    if (childLeftPrivateKeyValue % ED25519_SUBGROUP_ORDER === 0n) {
      throw new KeyDerivationError(ExceptionMessage.INVALID_DERIVED_ED25519_SCALAR);
    }

    const zRightValue = bytesToBigIntLittleEndian(zRightBytes);
    const parentRightPrivateKeyValue = bytesToBigIntLittleEndian(rightPrivateKeyBytes);

    const childRightPrivateKeyValue = (zRightValue + parentRightPrivateKeyValue) % UINT256_MODULUS;

    const childLeftPrivateKeyBytes = bigIntToBytesLittleEndian(
      childLeftPrivateKeyValue,
      ED25519_KEY_PART_LENGTH_BYTES,
    );
    const childRightPrivateKeyBytes = bigIntToBytesLittleEndian(
      childRightPrivateKeyValue,
      ED25519_KEY_PART_LENGTH_BYTES,
    );

    const childLeftPrivateKeyScalar = bytesToBigIntLittleEndian(childLeftPrivateKeyBytes);
    const childPublicPoint = multiplyEd25519BasePointByScalar(childLeftPrivateKeyScalar);
    const childPublicKeyBytes = encodeEd25519PointToBytes(childPublicPoint);

    if (childPublicKeyBytes.length !== ED25519_PUBLIC_KEY_LENGTH_BYTES) {
      throw new KeyDerivationError(ExceptionMessage.FAILED_TO_CREATE_HMAC512_HASH);
    }

    return {
      leftPrivateKeyBytes: childLeftPrivateKeyBytes,
      rightPrivateKeyBytes: childRightPrivateKeyBytes,
      publicKeyBytes: childPublicKeyBytes,
      chainCodeBytes: childChainCodeBytes,
    };
  }
}

export { AdaLedgerKeyDerivation };
