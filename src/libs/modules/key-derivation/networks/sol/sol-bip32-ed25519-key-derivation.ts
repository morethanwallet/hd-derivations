import {
  type AbstractKeyDerivation,
  type DeriveFromMnemonicParameters,
} from "@/libs/modules/key-derivation/libs/types/index.js";
import { type PrivateKey, type CommonKeyPair } from "@/libs/types/types.js";
import { type Mnemonic } from "@/libs/modules/mnemonic";
import { type Secp256k1Curve, type Ed25519Curve } from "@/libs/modules/curves/curves";
import { KeyDerivationError } from "../../libs/exceptions/index.js";
import { ExceptionMessage } from "../../libs/enums/index.js";
import { Ed25519SecretKeyIndex } from "./libs/enums/enums.js";
import { getBase58EncodedKeyPair, importByPrivateKey } from "./libs/helpers/helpers.js";

class SolKeyDerivation implements AbstractKeyDerivation<"solBase"> {
  private mnemonic: Mnemonic;
  private ed25519Curve: Ed25519Curve;
  private secp256k1Curve: Secp256k1Curve;

  public constructor(
    mnemonic: Mnemonic,
    ed25519Curve: Ed25519Curve,
    secp256k1Curve: Secp256k1Curve,
  ) {
    this.mnemonic = mnemonic;
    this.ed25519Curve = ed25519Curve;
    this.secp256k1Curve = secp256k1Curve;
  }

  public deriveFromMnemonic({
    derivationPath,
  }: DeriveFromMnemonicParameters<"solBase">): CommonKeyPair {
    const seed = this.mnemonic.getSeed();
    const rootKey = this.secp256k1Curve.getRootKeyFromSeed(seed);
    const node = this.secp256k1Curve.derivePath(rootKey, derivationPath);

    if (!node.privateKey) {
      throw new KeyDerivationError(ExceptionMessage.PRIVATE_KEY_GENERATION_FAILED);
    }

    const secretKeyBytes = node.privateKey.subarray(
      Ed25519SecretKeyIndex.START,
      Ed25519SecretKeyIndex.END,
    );

    const secretKeyBuffer = Buffer.from(secretKeyBytes);
    const publicKeyBuffer = this.ed25519Curve.getPublicKeyBuffer(secretKeyBuffer, false);

    return getBase58EncodedKeyPair(secretKeyBuffer, publicKeyBuffer);
  }

  public importByPrivateKey({ privateKey }: PrivateKey<"solBase">): CommonKeyPair {
    return importByPrivateKey(privateKey, this.ed25519Curve);
  }
}

export { SolKeyDerivation };
