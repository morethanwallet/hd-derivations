import {
  generateMnemonic,
  validateMnemonic as isMnemonicValid,
  mnemonicToEntropy,
  mnemonicToSeedSync,
  wordlists,
} from "bip39";

import { MnemonicError } from "./libs/exceptions/index.js";
import { ExceptionMessage } from "./libs/enums/index.js";
import { ALLOWED_MNEMONIC_LENGTHS, MNEMONIC_DIVIDER } from "./libs/constants/index.js";

class Mnemonic {
  protected mnemonic: string;

  public constructor(mnemonic?: string) {
    this.mnemonic = mnemonic === undefined ? generateMnemonic() : mnemonic;
    Mnemonic.validateMnemonic(this.mnemonic);
  }

  public static validateMnemonic(mnemonic: string): void {
    if (!mnemonic) {
      throw new MnemonicError(ExceptionMessage.EMPTY_MNEMONIC);
    }

    const mnemonicWordsLength = mnemonic.split(MNEMONIC_DIVIDER).length;

    if (!ALLOWED_MNEMONIC_LENGTHS.includes(mnemonicWordsLength)) {
      throw new MnemonicError(ExceptionMessage.INVALID_MNEMONIC_LENGTH);
    }

    if (!isMnemonicValid(mnemonic, wordlists.english)) {
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
