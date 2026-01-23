import type {
  ImportByPrivateKeyParameters,
  AbstractKeyDerivation,
  DeriveFromMnemonicParameters,
} from "@/libs/modules/key-derivation/libs/types/index.js";
import type { CommonKeyPair } from "@/libs/types/types.js";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Secp256r1Keypair } from "@mysten/sui/keypairs/secp256r1";
import { Secp256k1Keypair } from "@mysten/sui/keypairs/secp256k1";
import { Curve, ExceptionMessage } from "@/libs/enums/enums.js";
import { KeyDerivationError } from "../../libs/exceptions/index.js";
import type { KeyPairInstanceUnion, KeyPairUnion } from "./libs/types/index.js";
import { type Mnemonic } from "@/libs/modules/mnemonic/mnemonic.js";

class SuiKeyDerivation implements AbstractKeyDerivation<"suiBase"> {
  private mnemonic: Mnemonic;

  public constructor(mnemonic: Mnemonic) {
    this.mnemonic = mnemonic;
  }

  public deriveFromMnemonic({
    derivationPath,
    scheme,
  }: DeriveFromMnemonicParameters<"suiBase">): CommonKeyPair {
    const keyPairHandler = this.getKeyPairHandler(scheme);
    const keyPair = keyPairHandler.deriveKeypair(this.mnemonic.getMnemonic(), derivationPath);

    const privateKey = keyPair.getSecretKey();
    const publicKey = this.getPublicKey(keyPair);

    return { privateKey, publicKey };
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

  private getPublicKey(keyPair: KeyPairInstanceUnion): CommonKeyPair["publicKey"] {
    return keyPair.getPublicKey().toSuiPublicKey();
  }

  private getKeyPairHandler(
    scheme: Curve["ED25519"] | Curve["SECP256K1"] | Curve["SECP256R1"],
  ): KeyPairUnion {
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
