import type {
  TaprootKeyDerivation,
  CommonBipKeyDerivation,
  EnterpriseKeyDerivation,
  RewardKeyDerivation,
  BaseKeyDerivation,
  CommonEd25519KeyDerivation,
  SuiKeyDerivation,
} from "@/libs/modules/key-derivation/index.js";
import type {
  BtcDerivationTypeUnion,
  DerivationTypeMap,
  AvaxDerivationTypeUnion,
  AdaDerivationTypeUnion,
  DerivationTypeUnion,
  SignatureSchemeProperty,
} from "@/libs/types/index.js";
import { type DeriveItemFromMnemonicInnerHandler } from "./derive-item-from-mnemonic.type.js";
import { type GetCredentialFromPrivateKeyInnerHandler } from "./get-credential-from-private-key.type.js";
import { type DeriveItemsBatchFromMnemonicInnerHandler } from "./derive-items-batch-from-mnemonic.type.js";
import { type CheckIfPrivateKeyBelongsToMnemonicInnerHandler } from "./check-if-private-key-belongs-to-mnemonic.type.js";
import type {
  CommonNetworkPurposeUnion,
  CommonNetworkPurposeRegTestExtendedUnion,
  AdaNetworkPurposeUnion,
} from "./network-purpose-union.type.js";

type AvaxParameters = {
  networkPurpose: CommonNetworkPurposeUnion;
  derivationType: AvaxDerivationTypeUnion;
  keysDerivationInstance: InstanceType<typeof CommonBipKeyDerivation>;
};

type BtcParameters<TDerivationType extends DerivationTypeUnion> = {
  networkPurpose: CommonNetworkPurposeRegTestExtendedUnion;
} & (TDerivationType extends DerivationTypeMap["taproot"]
  ? { keysDerivationInstance: InstanceType<typeof TaprootKeyDerivation> }
  : { keysDerivationInstance: InstanceType<typeof CommonBipKeyDerivation> });

type AdaParameters<TDerivationType extends DerivationTypeUnion> = {
  networkId: number;
  networkPurpose: AdaNetworkPurposeUnion;
} & {
  keysDerivationInstance: TDerivationType extends DerivationTypeMap["enterprise"]
    ? InstanceType<typeof EnterpriseKeyDerivation>
    : TDerivationType extends DerivationTypeMap["reward"]
      ? InstanceType<typeof RewardKeyDerivation>
      : InstanceType<typeof BaseKeyDerivation>;
};

type TonParameters = {
  keysDerivationInstance: InstanceType<typeof CommonEd25519KeyDerivation>;
};

type SuiParameters = {
  keysDerivationInstance: InstanceType<typeof SuiKeyDerivation>;
} & SignatureSchemeProperty;

type GetDerivationHandlersParameters<TDerivationType extends DerivationTypeUnion> =
  TDerivationType extends AvaxDerivationTypeUnion
    ? AvaxParameters
    : TDerivationType extends BtcDerivationTypeUnion
      ? BtcParameters<TDerivationType>
      : TDerivationType extends AdaDerivationTypeUnion
        ? AdaParameters<TDerivationType>
        : TDerivationType extends DerivationTypeMap["tonBase"]
          ? TonParameters
          : TDerivationType extends DerivationTypeMap["suiBase"]
            ? SuiParameters
            : { keysDerivationInstance: CommonBipKeyDerivation };

type GetDerivationHandlersReturnType<T extends DerivationTypeUnion> = {
  deriveItemFromMnemonic: DeriveItemFromMnemonicInnerHandler<T>;
  getCredentialFromPrivateKey: GetCredentialFromPrivateKeyInnerHandler<T>;
  deriveItemsBatchFromMnemonic: DeriveItemsBatchFromMnemonicInnerHandler<T>;
  checkIfPrivateKeyBelongsToMnemonic: CheckIfPrivateKeyBelongsToMnemonicInnerHandler<T>;
};

export { type GetDerivationHandlersParameters, type GetDerivationHandlersReturnType };
