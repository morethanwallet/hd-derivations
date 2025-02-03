import type {
  TaprootKeyDerivation,
  CommonBipKeyDerivation,
  EnterpriseKeyDerivation,
  RewardKeyDerivation,
  BaseKeyDerivation,
  CommonEd25519KeyDerivation,
  SuiKeyDerivation,
  BnbKeyDerivation,
  EvmKeyDerivation,
  SolKeyDerivation,
  TransparentKeyDerivation,
} from "@/libs/modules/key-derivation/index.js";
import type {
  BtcDerivationTypeUnion,
  DerivationTypeMap,
  AvaxDerivationTypeUnion,
  AdaDerivationTypeUnion,
  DerivationTypeUnion,
  SignatureSchemeProperty,
  XrpDerivationTypeUnion,
} from "@/libs/types/index.js";
import { type DeriveItemFromMnemonic } from "./derive-item-from-mnemonic.type.js";
import { type GetCredentialFromPK } from "./get-credential-from-p-k.type.js";
import { type DeriveItemsBatchFromMnemonic } from "./derive-items-batch-from-mnemonic.type.js";
import { type DoesPKBelongToMnemonic } from "./does-p-k-belong-to-mnemonic.type.js";
import type { CommonNetworkPurposeUnion } from "./network-purpose-union.type.js";
import type { TonAddressDerivationConfig } from "./ton-address-derivation-config.type.js";
import type { DestinationTagProperty, Ss58Format } from "@/libs/modules/address/index.js";

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

type XrpParameters = {
  keysDerivationInstance: CommonBipKeyDerivation;
  isTestnet: boolean;
  derivationType: XrpDerivationTypeUnion;
} & DestinationTagProperty;

type BnbParameters = { keysDerivationInstance: BnbKeyDerivation };

type EvmParameters = { keysDerivationInstance: EvmKeyDerivation };

type DotParameters = { keysDerivationInstance: CommonEd25519KeyDerivation } & Ss58Format;

type BchParameters = { keysDerivationInstance: CommonBipKeyDerivation; isRegtest: boolean };

type SolParameters = { keysDerivationInstance: SolKeyDerivation };

type ZecParameters = { keysDerivationInstance: TransparentKeyDerivation };

type GetDerivationHandlersParameters<T extends DerivationTypeUnion> =
  T extends AvaxDerivationTypeUnion
    ? AvaxParameters
    : T extends BtcDerivationTypeUnion
      ? BtcParameters<T>
      : T extends AdaDerivationTypeUnion
        ? AdaParameters<T>
        : T extends DerivationTypeMap["tonBase"]
          ? TonParameters
          : T extends DerivationTypeMap["suiBase"]
            ? SuiParameters
            : T extends XrpDerivationTypeUnion
              ? XrpParameters
              : T extends DerivationTypeMap["bnbBase"]
                ? BnbParameters
                : T extends DerivationTypeMap["evmBase"]
                  ? EvmParameters
                  : T extends DerivationTypeMap["dotBase"]
                    ? DotParameters
                    : T extends DerivationTypeMap["bchCashAddr"]
                      ? BchParameters
                      : T extends DerivationTypeMap["solBase"]
                        ? SolParameters
                        : T extends DerivationTypeMap["zecTransparent"]
                          ? ZecParameters
                          : { keysDerivationInstance: CommonBipKeyDerivation };

type GetDerivationHandlersReturnType<T extends DerivationTypeUnion> = {
  deriveItemFromMnemonic: DeriveItemFromMnemonic<T>;
  getCredentialFromPK: GetCredentialFromPK<T>;
  deriveItemsBatchFromMnemonic: DeriveItemsBatchFromMnemonic<T>;
  doesPKBelongToMnemonic: DoesPKBelongToMnemonic<T>;
};

export { type GetDerivationHandlersParameters, type GetDerivationHandlersReturnType };
