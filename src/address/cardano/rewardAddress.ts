import { Keys } from "./keys/index.js";
import {
  Credential,
  PrivateKey,
  RewardAddress as LibraryRewardAddress,
} from "@emurgo/cardano-serialization-lib-nodejs";
import { appendAddressToDerivationPath, removeDerivationPathAddress } from "../helpers/index.js";
import { EMPTY_MNEMONIC, SEARCH_FROM_MNEMONIC_LIMIT } from "../constants/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type AbstractAddress, type AddressData } from "./types/index.js";
import {
  getAccount,
  getAddressValue,
  getCredential,
  getNetworkId,
  updateDerivationPathChange,
} from "./helpers/index.js";
import { type KeyPair } from "../index.js";
import { Change } from "./enums/index.js";
import { type NetworkPurpose } from "@/network/cardano/index.js";

class RewardAddress extends Keys implements AbstractAddress<"reward"> {
  public constructor(mnemonic: Mnemonic) {
    super(mnemonic);
  }

  public getData(derivationPath: string, networkPurpose: NetworkPurpose): AddressData<"reward"> {
    const rootKey = this.getRootKey();
    const account = getAccount(rootKey, derivationPath);
    const addressValue = getAddressValue(derivationPath);
    const node = account.derive(Change.CHIMERIC).derive(addressValue);
    const { privateKey, publicKey } = this.getRawKeys(node);
    const credential = getCredential(publicKey);
    const address = this.getAddress(credential, networkPurpose);

    return {
      address,
      path: updateDerivationPathChange(derivationPath, Change.CHIMERIC),
      privateKey: privateKey.to_hex(),
      publicKey: publicKey.to_hex(),
      mnemonic: this.mnemonic.getMnemonic(),
    };
  }

  public importByPrivateKey(
    derivationPath: string,
    privateKey: KeyPair["privateKey"],
    networkPurpose: NetworkPurpose
  ): AddressData<"reward"> {
    const derivationPathWithoutAddress = removeDerivationPathAddress(derivationPath);

    for (let i = 0; i < SEARCH_FROM_MNEMONIC_LIMIT; i++) {
      const incrementedDerivationPath = appendAddressToDerivationPath(
        derivationPathWithoutAddress,
        i
      );

      const data = this.getData(incrementedDerivationPath, networkPurpose);

      if (data.privateKey === privateKey) return data;
    }

    const rawPublicKey = PrivateKey.from_hex(privateKey).to_public();
    const credential = getCredential(rawPublicKey);
    const address = this.getAddress(credential, networkPurpose);

    return {
      address,
      privateKey,
      publicKey: rawPublicKey.to_hex(),
      path: updateDerivationPathChange(derivationPath, Change.CHIMERIC),
      mnemonic: EMPTY_MNEMONIC,
    };
  }

  private getAddress(
    credential: Credential,
    networkPurpose: NetworkPurpose
  ): AddressData<"reward">["address"] {
    const address = LibraryRewardAddress.new(getNetworkId(networkPurpose), credential);

    return address.to_address().to_bech32();
  }
}

export { RewardAddress };
