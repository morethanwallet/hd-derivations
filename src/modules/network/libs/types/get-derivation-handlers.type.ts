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
import { type DeriveItemFromMnemonic } from "./derive-item-from-mnemonic.type.js";
import { type GetCredentialFromPK } from "./get-credential-from-p-k.type.js";
import { type DeriveItemsBatchFromMnemonic } from "./derive-items-batch-from-mnemonic.type.js";
import { type DoesPKBelongToMnemonic } from "./does-p-k-belong-to-mnemonic.type.js";
import type { CommonNetworkPurposeUnion } from "./network-purpose-union.type.js";
import type { TonAddressDerivationConfig } from "./ton-address-derivation-config.type.js";

type AvaxParameters = {
  derivationType: AvaxDerivationTypeUnion;
  keysDerivationInstance: CommonBipKeyDerivation;
};

type BtcParameters<TDerivationType extends DerivationTypeUnion> =
  TDerivationType extends DerivationTypeMap["btcTaproot"]
    ? { keysDerivationInstance: TaprootKeyDerivation }
    : { keysDerivationInstance: CommonBipKeyDerivation };

type AdaParameters<TDerivationType extends DerivationTypeUnion> = {
  networkId: number;
} & {
  keysDerivationInstance: TDerivationType extends DerivationTypeMap["adaEnterprise"]
    ? EnterpriseKeyDerivation
    : TDerivationType extends DerivationTypeMap["adaReward"]
      ? RewardKeyDerivation
      : BaseKeyDerivation;
};

type TonParameters = {
  keysDerivationInstance: CommonEd25519KeyDerivation;
  networkPurpose: CommonNetworkPurposeUnion;
} & TonAddressDerivationConfig;

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
  deriveItemFromMnemonic: DeriveItemFromMnemonic<T>;
  getCredentialFromPK: GetCredentialFromPK<T>;
  deriveItemsBatchFromMnemonic: DeriveItemsBatchFromMnemonic<T>;
  doesPKBelongToMnemonic: DoesPKBelongToMnemonic<T>;
};

export { type GetDerivationHandlersParameters, type GetDerivationHandlersReturnType };
