import { PrivateKey as LibraryPrivateKey } from "@emurgo/cardano-serialization-lib-nodejs";
import { type Mnemonic } from "@/libs/modules/mnemonic/index.js";
import { EnterpriseKeyDerivation } from "./enterprise-key-derivation.js";
import { RewardKeyDerivation } from "./reward-key-derivation.js";
import {
  type AbstractKeyDerivation,
  type DeriveFromMnemonicParameters,
} from "@/modules/key-derivation/libs/types/index.js";
import { type PrivateKey, type CardanoBaseKeyPair } from "@/libs/types/index.js";
import { AdaKeys } from "@/libs/modules/keys/index.js";

class BaseKeyDerivation extends AdaKeys implements AbstractKeyDerivation<"adaBase"> {
  private enterpriseAddress: EnterpriseKeyDerivation;
  private rewardAddress: RewardKeyDerivation;

  public constructor(mnemonic: Mnemonic) {
    super(mnemonic);

    this.enterpriseAddress = new EnterpriseKeyDerivation(mnemonic);
    this.rewardAddress = new RewardKeyDerivation(mnemonic);
  }

  public deriveFromMnemonic({
    derivationPath,
    networkPurpose,
  }: DeriveFromMnemonicParameters<"adaBase">): CardanoBaseKeyPair {
    const derivedEnterpriseItem = this.enterpriseAddress.deriveFromMnemonic({
      derivationPath,
      networkPurpose,
    });

    const derivedRewardItem = this.rewardAddress.deriveFromMnemonic({
      derivationPath,
      networkPurpose,
    });

    return {
      enterprisePrivateKey: derivedEnterpriseItem.privateKey,
      enterprisePublicKey: derivedEnterpriseItem.publicKey,
      rewardPrivateKey: derivedRewardItem.privateKey,
      rewardPublicKey: derivedRewardItem.publicKey,
    };
  }

  public importByPrivateKey({
    enterprisePrivateKey,
    rewardPrivateKey,
  }: PrivateKey<"adaBase">): CardanoBaseKeyPair {
    const enterprisePublicKey = LibraryPrivateKey.from_hex(enterprisePrivateKey)
      .to_public()
      .to_hex();

    const rewardPublicKey = LibraryPrivateKey.from_hex(rewardPrivateKey).to_public().to_hex();

    return {
      enterprisePrivateKey,
      rewardPrivateKey,
      enterprisePublicKey,
      rewardPublicKey,
    };
  }
}

export { BaseKeyDerivation };
