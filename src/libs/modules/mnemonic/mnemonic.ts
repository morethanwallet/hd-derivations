import {
  generateMnemonic,
  validateMnemonic as isMnemonicValid,
  mnemonicToEntropy,
  mnemonicToSeedSync,
  wordlists,
} from "bip39";
import { type Buffer } from "buffer";
import { MnemonicError } from "./libs/exceptions/index.js";
import { ExceptionMessage } from "./libs/enums/index.js";

class Mnemonic {
  private mnemonic: string;

  public constructor(mnemonic?: string) {
    this.mnemonic = mnemonic === undefined ? generateMnemonic() : mnemonic;
    this.validateMnemonic();
  }

  private validateMnemonic(): void {
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

  protected getHexSeed(): string {
    return this.getSeed().toString("hex");
  }
}

export { Mnemonic };
