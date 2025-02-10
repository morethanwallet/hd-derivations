import { ExceptionMessage as CommonExceptionMessage } from "@/libs/enums/index.js";
import { KeyDerivationError } from "@/libs/exceptions/index.js";
import { Ed25519Keys } from "@/libs/modules/keys/index.js";
import type {
  AptDerivationTypeUnion,
  CommonDerivationPath,
  CommonKeyPair,
  CommonPrivateKey,
} from "@/libs/types/index.js";
import type {
  AbstractKeyDerivation,
  DeriveFromMnemonicParameters,
  ImportByPrivateKeyParameters,
} from "../../libs/types/index.js";
import {
  Account,
  type AnyPublicKey,
  Ed25519Account,
  Ed25519PrivateKey,
  type Ed25519PublicKey,
  MultiKey,
  MultiKeyAccount,
  PrivateKey,
  type PrivateKeyInput,
  PrivateKeyVariants,
  Secp256k1PrivateKey,
  SingleKeyAccount,
} from "@aptos-labs/ts-sdk";
import { MINIMUM_MULTISIG_ADDRESS_SIGNATURES_AMOUNT } from "@/libs/constants/index.js";
import { HDKey } from "@scure/bip32";
import { secp256r1 } from "@noble/curves/p256";
import { VALIDATION_MESSAGE_TO_SIGN } from "./libs/constants/index.js";
import { sha3_256 } from "@noble/hashes/sha3";
import { toHexFromBytes, toUint8Array } from "@/libs/helpers/index.js";
import { ExceptionMessage } from "../../libs/enums/index.js";
import {
  ellipticCurveAlgorithmToPrivateKeyVariant,
  ellipticCurveAlgorithmToSchemeId,
} from "./libs/maps/index.js";
import { addHexPrefix, removeHexPrefix } from "@/libs/utils/index.js";

class AptKeyDerivation
  extends Ed25519Keys
  implements AbstractKeyDerivation<AptDerivationTypeUnion>
{
  public deriveFromMnemonic({
    derivationPath,
    algorithm,
    isLegacy,
    isMultiSig,
  }: DeriveFromMnemonicParameters<AptDerivationTypeUnion>): CommonKeyPair {
    if (algorithm === "secp256r1") return this.getSecp256r1KeyPairFromMnemonic(derivationPath);

    const account = Account.fromDerivationPath({
      scheme: ellipticCurveAlgorithmToSchemeId[algorithm],
      mnemonic: this.mnemonic.getMnemonic(),
      path: derivationPath,
      legacy: isLegacy,
    });

    if (account instanceof Ed25519Account || account instanceof SingleKeyAccount) {
      if (isMultiSig) {
        const multiKey = new MultiKey({
          signaturesRequired: MINIMUM_MULTISIG_ADDRESS_SIGNATURES_AMOUNT,
          publicKeys: [account.publicKey],
        });
        const multiSigAccount = new MultiKeyAccount({ multiKey, signers: [account] });

        return this.getKeyPair(account.privateKey, multiSigAccount.publicKey);
      }

      return this.getKeyPair(account.privateKey, account.publicKey);
    }

    throw new KeyDerivationError(CommonExceptionMessage.INVALID_ALGORITHM);
  }

  public importByPrivateKey({
    privateKey,
    algorithm,
    isLegacy,
  }: ImportByPrivateKeyParameters<AptDerivationTypeUnion>): CommonKeyPair {
    if (algorithm === "secp256r1") return this.getSecp256r1KeyPairFromPrivateKey(privateKey);

    const formattedKey = this.formatPrivateKey(
      privateKey,
      ellipticCurveAlgorithmToPrivateKeyVariant[algorithm],
    );

    const rawKey =
      algorithm === "ed25519"
        ? new Ed25519PrivateKey(formattedKey)
        : new Secp256k1PrivateKey(formattedKey);

    const account = Account.fromPrivateKey({
      privateKey: rawKey,
      legacy: isLegacy,
    });

    return this.getKeyPair(account.privateKey, account.publicKey);
  }

  private getKeyPair(
    rawPrivateKey: PrivateKeyInput,
    rawPublicKey: AnyPublicKey | MultiKey | Ed25519PublicKey,
  ): CommonKeyPair {
    const privateKey = rawPrivateKey.toString();
    const publicKey = rawPublicKey.toString();

    return { privateKey, publicKey };
  }

  private formatPrivateKey(
    privateKey: CommonPrivateKey["privateKey"],
    privateKeyVariant: PrivateKeyVariants,
  ): CommonPrivateKey["privateKey"] {
    return PrivateKey.formatPrivateKey(privateKey, privateKeyVariant);
  }

  private getSecp256r1KeyPairFromMnemonic(
    derivationPath: CommonDerivationPath["derivationPath"],
  ): CommonKeyPair {
    const { privateKey } = HDKey.fromMasterSeed(this.mnemonic.getSeed()).derive(derivationPath);

    return this.getSecp256r1KeyPairFromPrivateKey(privateKey);
  }

  private getSecp256r1KeyPairFromPrivateKey(
    sourceKey: Uint8Array | CommonPrivateKey["privateKey"] | null,
  ): CommonKeyPair {
    if (!sourceKey) {
      throw new KeyDerivationError(CommonExceptionMessage.PROVIDED_DATA_IS_INVALID);
    }

    const privateKeyBytes =
      typeof sourceKey === "string"
        ? toUint8Array(Buffer.from(removeHexPrefix(sourceKey), "hex"))
        : sourceKey;

    const publicKeyBytes = secp256r1.getPublicKey(privateKeyBytes, true);
    this.validateSecp256r1KeyPair(privateKeyBytes, publicKeyBytes);
    const privateKey = addHexPrefix(toHexFromBytes(privateKeyBytes));
    const publicKey = addHexPrefix(toHexFromBytes(publicKeyBytes));

    return { privateKey, publicKey };
  }

  private validateSecp256r1KeyPair(
    privateKeyBytes: Uint8Array,
    publicKeyBytes: Uint8Array,
  ): void | never {
    const encoder = new TextEncoder();
    const encodedMessage = encoder.encode(VALIDATION_MESSAGE_TO_SIGN);
    const messageHash = toHexFromBytes(sha3_256(encodedMessage));
    const signature = secp256r1.sign(messageHash, privateKeyBytes, { lowS: true });

    if (!secp256r1.verify(signature, messageHash, publicKeyBytes, { lowS: true })) {
      throw new KeyDerivationError(ExceptionMessage.INVALID_PRIVATE_KEY);
    }
  }
}

export { AptKeyDerivation };
