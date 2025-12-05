import { mnemonicToEntropy } from "@polkadot/util-crypto";
import { Mnemonic } from "./mnemonic.js";
import { convertBytesToHex } from "@/libs/utils/index.js";
import { stringToU8a } from "@polkadot/util";
import { pbkdf2 } from "@noble/hashes/pbkdf2";
import { sha512 } from "@noble/hashes/sha512";
import { ThirtyTwoBytePrivateKeyIndex } from "@/libs/enums/enums.js";

class DotMnemonic extends Mnemonic {
  public constructor(mnemonic?: string) {
    super(mnemonic);
  }

  public getEntropyBytes(): Uint8Array {
    return mnemonicToEntropy(this.mnemonic);
  }

  public getEntropy(): string {
    return convertBytesToHex(this.getEntropyBytes());
  }

  public getSeed(): Buffer {
    const entropy = this.getEntropyBytes();
    const seedLength = 64;
    const roundsCount = 2048;
    //TODO: Add password support to the package
    const password = "";
    const salt = stringToU8a(`mnemonic${password}`);

    return Buffer.from(
      pbkdf2(sha512, entropy, salt, { c: roundsCount, dkLen: seedLength }),
    ).subarray(ThirtyTwoBytePrivateKeyIndex.START, ThirtyTwoBytePrivateKeyIndex.END);
  }
}

export { DotMnemonic };
