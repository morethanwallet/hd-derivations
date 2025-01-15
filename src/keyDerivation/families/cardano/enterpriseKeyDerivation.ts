import { PrivateKey } from "@emurgo/cardano-serialization-lib-nodejs";
import { type Mnemonic } from "@/mnemonic/index.js";
import { getAccount, getAddressValue } from "./helpers/index.js";
import { Change } from "./enums/index.js";
import {
  type CommonKeyPair,
  type AbstractKeyDerivation,
  type DeriveFromMnemonicParameters,
  type ImportByPrivateKeyParameters,
} from "../../types/index.js";
import { Keys } from "@/keys/cardano/index.js";

class EnterpriseKeyDerivation extends Keys implements AbstractKeyDerivation<"enterprise"> {
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

  public importByPrivateKey({
    privateKey,
  }: ImportByPrivateKeyParameters<"enterprise">): CommonKeyPair {
    const rawPublicKey = PrivateKey.from_hex(privateKey).to_public();

    return {
      privateKey,
      publicKey: rawPublicKey.to_hex(),
    };
  }
}

export { EnterpriseKeyDerivation };
