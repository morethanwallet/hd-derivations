import { PrivateKey as LibraryPrivateKey } from "@emurgo/cardano-serialization-lib-nodejs";
import { type Mnemonic } from "@/mnemonic/index.js";
import { EnterpriseKeyDerivation } from "./enterpriseKeyDerivation.js";
import { RewardKeyDerivation } from "./rewardKeyDerivation.js";
import {
  type AbstractKeyDerivation,
  type DeriveFromMnemonicParameters,
} from "../../types/index.js";
import { type PrivateKey, type CardanoBaseKeyPair } from "@/types/keys/index.js";
import { Keys } from "@/keys/cardano/index.js";

class BaseKeyDerivation extends Keys implements AbstractKeyDerivation<"adaBase"> {
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
