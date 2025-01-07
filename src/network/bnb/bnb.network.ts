import { BnbAddress, type KeyPair } from "@/address/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type AbstractNetwork } from "@/network/types/index.js";
import { config } from "./config/index.js";
import { validateDerivationPath } from "@/helpers/index.js";
import { derivationPathSegmentToAllowedValue } from "./validation/index.js";

class Bnb implements AbstractNetwork {
  private bnbAddress: BnbAddress;

  public constructor(mnemonic: Mnemonic) {
    this.bnbAddress = new BnbAddress(config.keysConfig, mnemonic);
  }

  public getAddressData(derivationPath: string) {
    this.validateDerivationPath(derivationPath);

    return this.bnbAddress.getData(derivationPath);
  }

  public importByPrivateKey(derivationPath: string, privateKey: KeyPair["privateKey"]) {
    return this.bnbAddress.importByPrivateKey(derivationPath, privateKey);
  }

  private validateDerivationPath(derivationPath: string): void | never {
    validateDerivationPath({
      derivationPath,
      allowedPurpose: derivationPathSegmentToAllowedValue.purpose,
      allowedCoin: derivationPathSegmentToAllowedValue.coin,
    });
  }
}

export { Bnb };
