import type {
  ImportByPrivateKeyParameters,
  AbstractKeyDerivation,
  DeriveFromMnemonicParameters,
} from "@/libs/modules/key-derivation/libs/types/index.js";
import type { CommonKeyPair, GetSignatureSchemeUnion } from "@/libs/types/index.js";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Secp256r1Keypair } from "@mysten/sui/keypairs/secp256r1";
import { Secp256k1Keypair } from "@mysten/sui/keypairs/secp256k1";
import { ExceptionMessage } from "@/libs/enums/index.js";
import { KeyDerivationError } from "../../libs/exceptions/index.js";
import type { KeyPairInstanceUnion, KeyPairUnion } from "./libs/types/index.js";
import { Ed25519Keys } from "@/libs/modules/keys/index.js";

class SuiKeyDerivation extends Ed25519Keys implements AbstractKeyDerivation<"suiBase"> {
  public deriveFromMnemonic({
    derivationPath,
    algorithm,
  }: DeriveFromMnemonicParameters<"suiBase">): CommonKeyPair {
    const keyPairHandler = this.getKeyPairHandler(algorithm);
    const keyPair = keyPairHandler.deriveKeypair(this.mnemonic.getMnemonic(), derivationPath);

    return this.getKeyPair(keyPair);
  }

  public importByPrivateKey({
    privateKey,
    algorithm,
  }: ImportByPrivateKeyParameters<"suiBase">): CommonKeyPair {
    const keyPairHandler = this.getKeyPairHandler(algorithm);
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

  private getKeyPairHandler(
    algorithm: GetSignatureSchemeUnion<"ed25519" | "secp256k1" | "secp256r1">,
  ): KeyPairUnion {
    switch (algorithm) {
      case "secp256k1":
        return Secp256k1Keypair;
      case "secp256r1":
        return Secp256r1Keypair;
      case "ed25519":
        return Ed25519Keypair;
      default:
        throw new KeyDerivationError(ExceptionMessage.INVALID_ALGORITHM);
    }
  }
}

export { SuiKeyDerivation };
