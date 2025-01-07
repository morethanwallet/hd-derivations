import { type KeyPair, AvaxAddress } from "@/address/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type NetworkType, type AbstractNetwork, type NetworkPurpose } from "./types/index.js";
import { config } from "./config/index.js";
import { validateDerivationPath } from "@/helpers/index.js";
import { derivationPathSegmentToAllowedValue } from "./validation/index.js";

class Avax implements AbstractNetwork {
  private purpose: NetworkPurpose;
  private avaxAddress: AvaxAddress;

  public constructor(mnemonic: Mnemonic, purpose: NetworkPurpose) {
    this.purpose = purpose;
    this.avaxAddress = new AvaxAddress(config.keysConfig, mnemonic);
  }

  public getAddressData(derivationPath: string, networkType: NetworkType) {
    this.validateDerivationPath(derivationPath);
    return this.avaxAddress.getData(derivationPath, networkType, this.purpose);
  }

  public importByPrivateKey(
    derivationPath: string,
    privateKey: KeyPair["privateKey"],
    networkType: NetworkType
  ) {
    return this.avaxAddress.importByPrivateKey(
      derivationPath,
      privateKey,
      networkType,
      this.purpose
    );
  }

  private validateDerivationPath(derivationPath: string): void | never {
    validateDerivationPath({
      derivationPath,
      allowedPurpose: derivationPathSegmentToAllowedValue.purpose,
      allowedCoin: derivationPathSegmentToAllowedValue.coin,
    });
  }
}

export { Avax };
