import base58 from "bs58";
import { Keypair } from "@solana/web3.js";
import { Keys } from "@/keys/solana/index.js";
import {
  AbstractKeyDerivation,
  CommonKeyPair,
  DeriveFromMnemonicParameters,
  ImportByPrivateKeyParameters,
} from "@/keyDerivation/types/index.js";

class SolanaKeyDerivation extends Keys implements AbstractKeyDerivation<"sol"> {
  public deriveFromMnemonic({
    derivationPath,
  }: DeriveFromMnemonicParameters<"sol">): CommonKeyPair {
    const { privateKey, publicKey } = this.getKeyPair(derivationPath);

    return {
      privateKey,
      publicKey,
    };
  }

  public importByPrivateKey({ privateKey }: ImportByPrivateKeyParameters<"sol">): CommonKeyPair {
    const keyPair = Keypair.fromSecretKey(base58.decode(privateKey));
    const publicKey = this.getPublicKey(keyPair);

    return {
      privateKey,
      publicKey,
    };
  }

  private getKeyPair(derivationPath: string): CommonKeyPair {
    const rootKey = this.getRootKey();
    const keyPair = Keypair.fromSeed(rootKey.derive(derivationPath).privateKey);
    const publicKey = this.getPublicKey(keyPair);
    const privateKey = base58.encode(keyPair.secretKey);

    return { privateKey, publicKey };
  }

  private getPublicKey(keyPair: Keypair): string {
    return keyPair.publicKey.toBase58();
  }
}

export { SolanaKeyDerivation };
