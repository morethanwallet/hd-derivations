import { PrivateKey } from "@emurgo/cardano-serialization-lib-nodejs";
import { type Mnemonic } from "@/mnemonic/index.js";
import { getAccount, getAddressValue } from "./helpers/index.js";
import { Change } from "./enums/index.js";
import { Keys } from "@/keys/cardano/index.js";
import {
  type CommonKeyPair,
  type AbstractKeyDerivation,
  type DeriveFromMnemonicParameters,
  type ImportByPrivateKeyParameters,
} from "../types/index.js";

class RewardKeyDerivation extends Keys implements AbstractKeyDerivation<"reward"> {
  public constructor(mnemonic: Mnemonic) {
    super(mnemonic);
  }

  public deriveFromMnemonic({
    derivationPath,
  }: DeriveFromMnemonicParameters<"reward">): CommonKeyPair {
    const rootKey = this.getRootKey();
    const account = getAccount(rootKey, derivationPath);
    const addressValue = getAddressValue(derivationPath);
    const node = account.derive(Change.CHIMERIC).derive(addressValue);
    const { privateKey, publicKey } = this.getRawKeys(node);

    return {
      // derivationPath: updateDerivationPathChange(derivationPath, Change.CHIMERIC),
      privateKey: privateKey.to_hex(),
      publicKey: publicKey.to_hex(),
    };
  }

  public importByPrivateKey({ privateKey }: ImportByPrivateKeyParameters<"reward">): CommonKeyPair {
    // const derivationPathWithoutAddress = removeDerivationPathAddress(derivationPath);

    // for (let i = 0; i < SEARCH_FROM_MNEMONIC_LIMIT; i++) {
    //   const incrementedDerivationPath = appendAddressToDerivationPath(
    //     derivationPathWithoutAddress,
    //     i
    //   );

    //   const data = this.deriveFromMnemonic({
    //     networkPurpose,
    //     derivationPath: incrementedDerivationPath,
    //   });

    //   if (data.privateKey === privateKey) return data;
    // }

    const rawPublicKey = PrivateKey.from_hex(privateKey).to_public();

    return {
      privateKey,
      publicKey: rawPublicKey.to_hex(),
    };
  }
}

export { RewardKeyDerivation };
