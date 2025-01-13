import {
  Credential,
  PrivateKey,
  EnterpriseAddress as LibraryEnterpriseAddress,
} from "@emurgo/cardano-serialization-lib-nodejs";
import { appendAddressToDerivationPath, removeDerivationPathAddress } from "../helpers/index.js";
import { SEARCH_FROM_MNEMONIC_LIMIT } from "../constants/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import {
  getAccount,
  getAddressValue,
  getCredential,
  getNetworkId,
  updateDerivationPathChange,
} from "./helpers/index.js";
import { Change } from "./enums/index.js";
import {
  type DerivedItem,
  type AbstractKeyDerivation,
  type DeriveFromMnemonicParameters,
  type ImportByPrivateKeyParameters,
  type DerivedCredential,
} from "../types/index.js";
import { type DerivationType } from "../enums/index.js";
import { Keys } from "@/keys/cardano/index.js";
import { type NetworkPurposeUnion } from "@/families/cardano/types/index.js";

class EnterpriseAddress
  extends Keys
  implements AbstractKeyDerivation<typeof DerivationType.ADA_ENTERPRISE>
{
  public constructor(mnemonic: Mnemonic) {
    super(mnemonic);
  }

  public deriveFromMnemonic({
    derivationPath,
    networkPurpose,
  }: DeriveFromMnemonicParameters<typeof DerivationType.ADA_ENTERPRISE>): DerivedItem<
    typeof DerivationType.ADA_ENTERPRISE
  > {
    const rootKey = this.getRootKey();
    const account = getAccount(rootKey, derivationPath);
    const addressValue = getAddressValue(derivationPath);
    const node = account.derive(Change.EXTERNAL).derive(addressValue);
    const { privateKey, publicKey } = this.getRawKeys(node);
    const credential = getCredential(publicKey);
    const address = this.getAddress(credential, networkPurpose);

    return {
      address,
      derivationPath: updateDerivationPathChange(derivationPath, Change.EXTERNAL),
      privateKey: privateKey.to_hex(),
      publicKey: publicKey.to_hex(),
    };
  }

  public importByPrivateKey({
    derivationPath,
    privateKey,
    networkPurpose,
  }: ImportByPrivateKeyParameters<typeof DerivationType.ADA_ENTERPRISE>): DerivedCredential<
    typeof DerivationType.ADA_ENTERPRISE
  > {
    const derivationPathWithoutAddress = removeDerivationPathAddress(derivationPath);

    for (let i = 0; i < SEARCH_FROM_MNEMONIC_LIMIT; i++) {
      const incrementedDerivationPath = appendAddressToDerivationPath(
        derivationPathWithoutAddress,
        i
      );

      const data = this.deriveFromMnemonic({
        networkPurpose,
        derivationPath: incrementedDerivationPath,
      });

      if (data.privateKey === privateKey) return data;
    }

    const rawPublicKey = PrivateKey.from_hex(privateKey).to_public();
    const credential = getCredential(rawPublicKey);
    const address = this.getAddress(credential, networkPurpose);

    return {
      address,
      privateKey,
      publicKey: rawPublicKey.to_hex(),
    };
  }

  private getAddress(
    credential: Credential,
    networkPurpose: NetworkPurposeUnion
  ): DerivedItem<typeof DerivationType.ADA_ENTERPRISE>["address"] {
    const address = LibraryEnterpriseAddress.new(getNetworkId(networkPurpose), credential);

    return address.to_address().to_bech32();
  }
}

export { EnterpriseAddress };
