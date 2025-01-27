import type {
  ImportByPrivateKeyParameters,
  AbstractKeyDerivation,
  DeriveFromMnemonicParameters,
} from "@/modules/key-derivation/libs/types/index.js";
import type { CommonKeyPair, SignatureSchemeUnion } from "@/libs/types/index.js";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Secp256r1Keypair } from "@mysten/sui/keypairs/secp256r1";
import { Secp256k1Keypair } from "@mysten/sui/keypairs/secp256k1";
import { ExceptionMessage } from "@/libs/enums/index.js";
import { KeyDerivationError } from "@/libs/exceptions/index.js";
import type { KeyPairInstanceUnion, KeyPairUnion } from "./libs/types/index.js";
import { Ed25519Keys } from "@/libs/modules/keys/index.js";

class SuiKeyDerivation extends Ed25519Keys implements AbstractKeyDerivation<"suiBase"> {
  public deriveFromMnemonic({
    derivationPath,
    scheme,
  }: DeriveFromMnemonicParameters<"suiBase">): CommonKeyPair {
    const keyPairHandler = this.getKeyPairHandler(scheme);
    const keyPair = keyPairHandler.deriveKeypair(this.mnemonic.getMnemonic(), derivationPath);

    return this.getKeyPair(keyPair);
  }

  public importByPrivateKey({
    privateKey,
    scheme,
  }: ImportByPrivateKeyParameters<"suiBase">): CommonKeyPair {
    const keyPairHandler = this.getKeyPairHandler(scheme);
    const keyPair = keyPairHandler.fromSecretKey(privateKey);
    const publicKey = this.getPublicKey(keyPair);

    return { privateKey, publicKey };
  }

  private getKeyPair(keyPair: KeyPairInstanceUnion): CommonKeyPair {
    const privateKey = keyPair.getSecretKey();
    const publicKey = this.getPublicKey(keyPair);

    return { privateKey, publicKey };
  }

  private getPublicKey(keyPair: KeyPairInstanceUnion): CommonKeyPair["publicKey"] {
    return keyPair.getPublicKey().toSuiPublicKey();
  }

  private getKeyPairHandler(scheme: SignatureSchemeUnion): KeyPairUnion {
    switch (scheme) {
      case "secp256k1":
        return Secp256k1Keypair;
      case "secp256r1":
        return Secp256r1Keypair;
      case "ed25519":
        return Ed25519Keypair;
      default:
        throw new KeyDerivationError(ExceptionMessage.INVALID_SCHEME);
    }
  }
}

export { SuiKeyDerivation };
