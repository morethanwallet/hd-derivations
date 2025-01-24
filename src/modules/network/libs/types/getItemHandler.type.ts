import type {
  TaprootKeyDerivation,
  CommonBipKeyDerivation,
  EnterpriseKeyDerivation,
  RewardKeyDerivation,
  BaseKeyDerivation,
  TonKeyDerivation,
  SuiKeyDerivation,
} from "@/modules/keyDerivation/index.js";
import type {
  BtcDerivationTypeUnion,
  DerivationTypeMap,
  AvaxDerivationTypeUnion,
  AdaDerivationTypeUnion,
  DerivationTypeUnion,
  SignatureSchemeProperty,
} from "@/libs/types/index.js";
import { type DeriveItemFromMnemonicInnerHandler } from "./deriveItemFromMnemonic.type.js";
import { type GetCredentialFromPrivateKeyInnerHandler } from "./getCredentialFromPrivateKey.type.js";
import { type DeriveItemsBatchFromMnemonicInnerHandler } from "./deriveItemsBatchFromMnemonic.type.js";
import { type CheckIfPrivateKeyBelongsToMnemonicInnerHandler } from "./checkIfPrivateKeyBelongsToMnemonic.type.js";
import type {
  CommonNetworkPurposeUnion,
  CommonNetworkPurposeRegTestExtendedUnion,
  AdaNetworkPurposeUnion,
} from "./networkPurposeUnion.type.js";

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

type TonParameters = { keysDerivationInstance: InstanceType<typeof TonKeyDerivation> };

type SuiParameters = {
  keysDerivationInstance: InstanceType<typeof SuiKeyDerivation>;
} & SignatureSchemeProperty;

type GetItemHandlerParameters<TDerivationType extends DerivationTypeUnion> =
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

type GetItemHandlerReturnType<T extends DerivationTypeUnion> = {
  deriveItemFromMnemonic: DeriveItemFromMnemonicInnerHandler<T>;
  getCredentialFromPrivateKey: GetCredentialFromPrivateKeyInnerHandler<T>;
  deriveItemsBatchFromMnemonic: DeriveItemsBatchFromMnemonicInnerHandler<T>;
  checkIfPrivateKeyBelongsToMnemonic: CheckIfPrivateKeyBelongsToMnemonicInnerHandler<T>;
};

export { type GetItemHandlerParameters, type GetItemHandlerReturnType };
