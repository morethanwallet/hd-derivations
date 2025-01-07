import { SolanaAddress, type KeyPair } from "@/address/index.js";
import { validateDerivationPath } from "@/helpers/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type AbstractNetwork } from "@/network/types/index.js";
import { derivationPathSegmentToAllowedValue } from "./validation/index.js";

class Solana implements AbstractNetwork {
  private solanaAddress: SolanaAddress;

  public constructor(mnemonic: Mnemonic) {
    this.solanaAddress = new SolanaAddress(mnemonic);
  }

  public getAddressData(derivationPath: string) {
    this.validateDerivationPath(derivationPath);

    return this.solanaAddress.getData(derivationPath);
  }

  public importByPrivateKey(derivationPath: string, privateKey: KeyPair["privateKey"]) {
    return this.solanaAddress.importByPrivateKey(derivationPath, privateKey);
  }

  private validateDerivationPath(derivationPath: string): void | never {
    validateDerivationPath({
      derivationPath,
      allowedPurpose: derivationPathSegmentToAllowedValue.purpose,
      allowedCoin: derivationPathSegmentToAllowedValue.coin,
    });
  }
}

export { Solana };
