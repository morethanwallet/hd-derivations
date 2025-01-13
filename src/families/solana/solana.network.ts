import { SolanaAddress, type KeyPair } from "@/keyDerivation/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type AbstractNetwork } from "@/families/types/index.js";

class Solana implements AbstractNetwork {
  private solanaAddress: SolanaAddress;

  public constructor(mnemonic: Mnemonic) {
    this.solanaAddress = new SolanaAddress(mnemonic);
  }

  public derive(derivationPath: string) {
    return this.solanaAddress.derive(derivationPath);
  }

  public importByPrivateKey(derivationPath: string, privateKey: KeyPair["privateKey"]) {
    return this.solanaAddress.importByPrivateKey(derivationPath, privateKey);
  }
}

export { Solana };
