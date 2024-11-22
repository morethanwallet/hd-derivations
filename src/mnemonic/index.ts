import {
  generateMnemonic,
  validateMnemonic as isMnemonicValid,
  mnemonicToEntropy,
  mnemonicToSeedSync,
  wordlists,
} from "bip39";

class Mnemonic {
  private mnemonic: string;

  public constructor(mnemonic?: string) {
    this.mnemonic = mnemonic === undefined ? generateMnemonic() : mnemonic;
    this.validateMnemonic();
  }

  private validateMnemonic(): void {
    if (!isMnemonicValid(this.mnemonic, wordlists.english)) {
      throw new Error("Invalid Mnemonic");
    }
  }

  public getSeed(): Buffer {
    return mnemonicToSeedSync(this.mnemonic);
  }

  public getEntropy(): string {
    return mnemonicToEntropy(this.mnemonic);
  }

  public getMnemonic(): string {
    return this.mnemonic;
  }
}

export { Mnemonic };
