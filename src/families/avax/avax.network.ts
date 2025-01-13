import { type KeyPair, AvaxAddress } from "@/keyDerivation/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type NetworkType, type AbstractNetwork, type NetworkPurpose } from "./types/index.js";
import { config } from "./config/index.js";

class Avax implements AbstractNetwork {
  private purpose: NetworkPurpose;
  private avaxAddress: AvaxAddress;

  public constructor(mnemonic: Mnemonic, purpose: NetworkPurpose) {
    this.purpose = purpose;
    this.avaxAddress = new AvaxAddress(config.keysConfig, mnemonic);
  }

  public derive(derivationPath: string, networkType: NetworkType) {
    return this.avaxAddress.derive(derivationPath, networkType, this.purpose);
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
}

export { Avax };
