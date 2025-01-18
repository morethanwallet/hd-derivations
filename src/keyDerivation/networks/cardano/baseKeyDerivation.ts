import { PrivateKey } from "@emurgo/cardano-serialization-lib-nodejs";
import { type Mnemonic } from "@/mnemonic/index.js";
import { EnterpriseKeyDerivation } from "./enterpriseKeyDerivation.js";
import { RewardKeyDerivation } from "./rewardKeyDerivation.js";
import {
  type AbstractKeyDerivation,
  type DeriveFromMnemonicParameters,
  type ImportByPrivateKeyParameters,
  type CardanoBaseKeyPair,
} from "../types/index.js";
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
  }: ImportByPrivateKeyParameters<"adaBase">): CardanoBaseKeyPair {
    // TODO: Replace with checkIfPrivateKeyBelongsToMnemonic
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

    //   if (
    //     data.enterprisePrivateKey === enterprisePrivateKey &&
    //     data.rewardPrivateKey === rewardPrivateKey
    //   ) {
    //     return data;
    //   }
    // }

    const enterprisePublicKey = PrivateKey.from_hex(enterprisePrivateKey).to_public().to_hex();
    const rewardPublicKey = PrivateKey.from_hex(rewardPrivateKey).to_public().to_hex();

    return {
      enterprisePrivateKey,
      rewardPrivateKey,
      enterprisePublicKey,
      rewardPublicKey,
    };
  }
}

export { BaseKeyDerivation };
