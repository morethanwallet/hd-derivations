import {
  generateMnemonic,
  validateMnemonic as isMnemonicValid,
  mnemonicToEntropy,
  mnemonicToSeedSync,
  wordlists,
} from "bip39";
import { MnemonicError } from "./libs/exceptions/index.js";
import { ExceptionMessage } from "./libs/enums/index.js";

class Mnemonic {
  protected mnemonic: string;

  public constructor(mnemonic?: string) {
    this.mnemonic = mnemonic === undefined ? generateMnemonic() : mnemonic;
    this.validateMnemonic();
  }

  protected validateMnemonic(): void {
    if (!isMnemonicValid(this.mnemonic, wordlists.english)) {
      throw new MnemonicError(ExceptionMessage.INVALID_MNEMONIC);
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

  public getHexSeed(): string {
    return this.getSeed().toString("hex");
  }
}

export { Mnemonic };
