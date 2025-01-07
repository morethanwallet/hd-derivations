import { type KeyPair, XrpAddress } from "@/address/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type AbstractNetwork } from "./types/index.js";
import { config } from "./config/index.js";
import { type AddressType } from "@/address/xrp/index.js";
import { validateDerivationPath } from "@/helpers/index.js";
import { derivationPathSegmentToAllowedValue } from "./validation/index.js";

class Xrp implements AbstractNetwork {
  private xrpAddress: XrpAddress;

  public constructor(mnemonic: Mnemonic) {
    this.xrpAddress = new XrpAddress(config.keysConfig, mnemonic);
  }

  public getAddressData(derivationPath: string, addressType: AddressType, destinationTag?: number) {
    this.validateDerivationPath(derivationPath);

    return this.xrpAddress.getData(derivationPath, addressType, destinationTag);
  }

  public importByPrivateKey(
    derivationPath: string,
    privateKey: KeyPair["privateKey"],
    addressType: AddressType,
    destinationTag?: number
  ) {
    return this.xrpAddress.importByPrivateKey(
      derivationPath,
      privateKey,
      addressType,
      destinationTag
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

export { Xrp };
