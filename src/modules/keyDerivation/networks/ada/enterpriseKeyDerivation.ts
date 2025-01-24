import { PrivateKey as LibraryPrivateKey } from "@emurgo/cardano-serialization-lib-nodejs";
import { type Mnemonic } from "@/libs/modules/mnemonic/index.js";
import { getAccount, getAddressValue } from "./libs/helpers/index.js";
import { Change } from "./libs/enums/index.js";
import {
  type AbstractKeyDerivation,
  type DeriveFromMnemonicParameters,
} from "@/modules/keyDerivation/libs/types/index.js";
import { type PrivateKey, type CommonKeyPair } from "@/libs/types/index.js";
import { AdaKeys } from "@/libs/modules/keys/index.js";

class EnterpriseKeyDerivation extends AdaKeys implements AbstractKeyDerivation<"enterprise"> {
  public constructor(mnemonic: Mnemonic) {
    super(mnemonic);
  }

  public deriveFromMnemonic({
    derivationPath,
  }: DeriveFromMnemonicParameters<"enterprise">): CommonKeyPair {
    const rootKey = this.getRootKey();
    const account = getAccount(rootKey, derivationPath);
    const addressValue = getAddressValue(derivationPath);
    const node = account.derive(Change.EXTERNAL).derive(addressValue);
    const { privateKey, publicKey } = this.getRawKeys(node);

    return {
      // derivationPath: updateDerivationPathChange(derivationPath, Change.EXTERNAL),
      privateKey: privateKey.to_hex(),
      publicKey: publicKey.to_hex(),
    };
  }

  public importByPrivateKey({ privateKey }: PrivateKey<"enterprise">): CommonKeyPair {
    const rawPublicKey = LibraryPrivateKey.from_hex(privateKey).to_public();

    return {
      privateKey,
      publicKey: rawPublicKey.to_hex(),
    };
  }
}

export { EnterpriseKeyDerivation };
