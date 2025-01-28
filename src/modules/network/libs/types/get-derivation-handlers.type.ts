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
import { type GetCredentialFromPKInnerHandler } from "./get-credential-from-p-k.type.js";
import { type DeriveItemsBatchFromMnemonicInnerHandler } from "./derive-items-batch-from-mnemonic.type.js";
import { type DoesPKBelongToMnemonicInnerHandler } from "./does-p-k-belong-to-mnemonic.type.js";
import type {
  CommonNetworkPurposeUnion,
  CommonNetworkPurposeRegTestExtendedUnion,
  AdaNetworkPurposeUnion,
} from "./network-purpose-union.type.js";

type AvaxParameters = {
  networkPurpose: CommonNetworkPurposeUnion;
  derivationType: AvaxDerivationTypeUnion;
  keysDerivationInstance: CommonBipKeyDerivation;
};

type BtcParameters<TDerivationType extends DerivationTypeUnion> = {
  networkPurpose: CommonNetworkPurposeRegTestExtendedUnion;
} & (TDerivationType extends DerivationTypeMap["taproot"]
  ? { keysDerivationInstance: TaprootKeyDerivation }
  : { keysDerivationInstance: CommonBipKeyDerivation });

type AdaParameters<TDerivationType extends DerivationTypeUnion> = {
  networkId: number;
  networkPurpose: AdaNetworkPurposeUnion;
} & {
  keysDerivationInstance: TDerivationType extends DerivationTypeMap["enterprise"]
    ? EnterpriseKeyDerivation
    : TDerivationType extends DerivationTypeMap["reward"]
      ? RewardKeyDerivation
      : BaseKeyDerivation;
};

type TonParameters = {
  keysDerivationInstance: CommonEd25519KeyDerivation;
};

type SuiParameters = {
  keysDerivationInstance: SuiKeyDerivation;
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
  getCredentialFromPK: GetCredentialFromPKInnerHandler<T>;
  deriveItemsBatchFromMnemonic: DeriveItemsBatchFromMnemonicInnerHandler<T>;
  doesPKeyBelongToMnemonic: DoesPKBelongToMnemonicInnerHandler<T>;
};

export { type GetDerivationHandlersParameters, type GetDerivationHandlersReturnType };
