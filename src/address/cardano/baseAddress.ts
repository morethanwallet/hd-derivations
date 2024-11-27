import { Keys } from "./keys/index.js";
import {
  NetworkInfo,
  Credential,
  PrivateKey,
  BaseAddress as LibraryBaseAddress,
  PublicKey,
} from "@emurgo/cardano-serialization-lib-nodejs";
import { appendAddressToDerivationPath, removeDerivationPathAddress } from "../helpers/index.js";
import { EMPTY_MNEMONIC, SEARCH_FROM_MNEMONIC_LIMIT } from "../constants/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { BaseAddressKeyPair, type AbstractAddress, type AddressData } from "./types/index.js";
import { getCredential, updateDerivationPathChange } from "./helpers/index.js";
import { Change } from "./enums/index.js";
import { EnterpriseAddress } from "./enterpriseAddress.js";
import { RewardAddress } from "./rewardAddress.js";

class BaseAddress extends Keys implements AbstractAddress<"base"> {
  private enterpriseAddress: EnterpriseAddress;
  private rewardAddress: RewardAddress;

  public constructor(mnemonic: Mnemonic) {
    super(mnemonic);

    this.enterpriseAddress = new EnterpriseAddress(mnemonic);
    this.rewardAddress = new RewardAddress(mnemonic);
  }

  public getData(derivationPath: string): AddressData<"base"> {
    const enterpriseAddressData = this.enterpriseAddress.getData(derivationPath);
    const rewardAddressData = this.rewardAddress.getData(derivationPath);
    const enterpriseCredential = getCredential(PublicKey.from_hex(enterpriseAddressData.publicKey));
    const stakingCredential = getCredential(PublicKey.from_hex(rewardAddressData.publicKey));
    const address = this.getAddress(enterpriseCredential, stakingCredential);

    return {
      address,
      enterprisePath: enterpriseAddressData.path,
      enterprisePrivateKey: enterpriseAddressData.privateKey,
      enterprisePublicKey: enterpriseAddressData.publicKey,
      rewardPath: rewardAddressData.path,
      rewardPrivateKey: rewardAddressData.privateKey,
      rewardPublicKey: rewardAddressData.publicKey,
      mnemonic: this.mnemonic.getMnemonic(),
    };
  }

  public importByPrivateKey(
    derivationPath: string,
    enterprisePrivateKey: BaseAddressKeyPair["enterprisePrivateKey"],
    rewardPrivateKey: BaseAddressKeyPair["rewardPrivateKey"]
  ): AddressData<"base"> {
    const derivationPathWithoutAddress = removeDerivationPathAddress(derivationPath);

    for (let i = 0; i < SEARCH_FROM_MNEMONIC_LIMIT; i++) {
      const incrementedDerivationPath = appendAddressToDerivationPath(
        derivationPathWithoutAddress,
        i
      );

      const data = this.getData(incrementedDerivationPath);

      if (
        data.enterprisePrivateKey === enterprisePrivateKey &&
        data.rewardPrivateKey === rewardPrivateKey
      ) {
        return data;
      }
    }

    const rawEnterprisePublicKey = PrivateKey.from_hex(enterprisePrivateKey).to_public();
    const rawRewardPublicKey = PrivateKey.from_hex(rewardPrivateKey).to_public();
    const enterpriseCredential = getCredential(rawEnterprisePublicKey);
    const rewardCredential = getCredential(rawRewardPublicKey);
    const address = this.getAddress(enterpriseCredential, rewardCredential);

    return {
      address,
      enterprisePrivateKey,
      rewardPrivateKey,
      enterprisePublicKey: rawEnterprisePublicKey.to_hex(),
      enterprisePath: updateDerivationPathChange(derivationPath, Change.EXTERNAL),
      rewardPublicKey: rawRewardPublicKey.to_hex(),
      rewardPath: updateDerivationPathChange(derivationPath, Change.CHIMERIC),
      mnemonic: EMPTY_MNEMONIC,
    };
  }

  private getAddress(
    enterpriseCredential: Credential,
    rewardCredential: Credential
  ): AddressData<"base">["address"] {
    const address = LibraryBaseAddress.new(
      NetworkInfo.mainnet().network_id(),
      enterpriseCredential,
      rewardCredential
    );

    return address.to_address().to_bech32();
  }
}

export { BaseAddress };
