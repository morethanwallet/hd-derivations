import { P2pkhAddress } from "@/address/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type AbstractNetwork } from "@/network/types/index.js";
import { type NetworkPurpose } from "@/network/index.js";
import { config } from "./config/index.js";
import { validateDerivationPath } from "@/helpers/index.js";
import { derivationPathSegmentToAllowedValue } from "./validation/index.js";

class Dogecoin implements AbstractNetwork {
  private p2pkhAddress: P2pkhAddress;

  public constructor(mnemonic: Mnemonic, purpose: NetworkPurpose) {
    this.p2pkhAddress = new P2pkhAddress(config[purpose].legacy.keysConfig, mnemonic);
  }

  public getAddressData(derivationPath: string) {
    this.validateDerivationPath(derivationPath);

    return this.p2pkhAddress.getData(derivationPath);
  }

  public importByPrivateKey(derivationPath: string, privateKey: string) {
    return this.p2pkhAddress.importByPrivateKey(derivationPath, privateKey);
  }

  private validateDerivationPath(derivationPath: string): void | never {
    validateDerivationPath({
      derivationPath,
      allowedPurpose: derivationPathSegmentToAllowedValue.purpose,
      allowedCoin: derivationPathSegmentToAllowedValue.coin,
    });
  }
}

export { Dogecoin };
