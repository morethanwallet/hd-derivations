import type {
  TaprootKeyDerivation,
  CommonBipKeyDerivation,
  CommonEd25519KeyDerivation,
  SuiKeyDerivation,
  BnbKeyDerivation,
  EvmKeyDerivation,
  SolBaseKeyDerivation,
  TransparentKeyDerivation,
  AptKeyDerivation,
  AdaBaseKeyDerivation,
  AdaCommonKeyDerivation,
  DotKeyDerivation,
  SolExodusKeyDerivation,
} from "@/libs/modules/key-derivation/index.js";
import type {
  GetDerivationTypeUnion,
  AvaxDerivationTypeUnion,
  DerivationTypeUnion,
  XrpDerivationTypeUnion,
  GetSignatureSchemeUnion,
  AptDerivationTypeUnion,
  LtcDerivationTypeUnion,
} from "@/libs/types/types.js";
import { type DeriveItemFromMnemonic } from "./derive-item-from-mnemonic.type.js";
import { type GetCredentialFromPK } from "./get-credential-from-p-k.type.js";
import { type DeriveItemsBatchFromMnemonic } from "./derive-items-batch-from-mnemonic.type.js";
import { type DoesPKBelongToMnemonic } from "./does-p-k-belong-to-mnemonic.type.js";
import type { CommonNetworkPurposeUnion } from "../network-purpose-union.type.js";
import type { TonAddressDerivationConfig } from "../ton-address-derivation-config.type.js";
import type { DestinationTagProperty, Ss58Format } from "@/libs/modules/address/index.js";
import { AdaExodusKeyDerivation } from "@/libs/modules/key-derivation/networks/ada/ada-exodus-key-derivation.js";

type AvaxParameters = {
  prefix: string;
  keysDerivationInstance: CommonBipKeyDerivation;
};

type BtcTaprootParameters = { keysDerivationInstance: TaprootKeyDerivation };

type AdaCommonParameters = {
  networkId: number;
  keysDerivationInstance: AdaCommonKeyDerivation;
};

type AdaExoodusParameters = {
  networkId: number;
  keysDerivationInstance: AdaExodusKeyDerivation;
};

type AdaBaseParameters = {
  networkId: number;
  keysDerivationInstance: AdaBaseKeyDerivation;
};

type TonParameters = {
  keysDerivationInstance: CommonEd25519KeyDerivation;
  networkPurpose: CommonNetworkPurposeUnion;
} & TonAddressDerivationConfig;

type SuiParameters = {
  keysDerivationInstance: SuiKeyDerivation;
  scheme: GetSignatureSchemeUnion<"ed25519" | "secp256k1" | "secp256r1">;
};

type XrpParameters = {
  keysDerivationInstance: CommonBipKeyDerivation;
  isTestnet: boolean;
  derivationType: XrpDerivationTypeUnion;
} & DestinationTagProperty;

type BnbParameters = { keysDerivationInstance: BnbKeyDerivation };

type EvmParameters = { keysDerivationInstance: EvmKeyDerivation };

type DotStandardHdParameters = {
  keysDerivationInstance: CommonEd25519KeyDerivation;
} & Ss58Format;

type DotBaseParameters = {
  keysDerivationInstance: DotKeyDerivation;
  scheme: GetSignatureSchemeUnion<"ed25519" | "secp256k1" | "sr25519">;
} & Ss58Format;

type BchParameters = { keysDerivationInstance: CommonBipKeyDerivation; isRegtest: boolean };

type SolBaseParameters = { keysDerivationInstance: SolBaseKeyDerivation };

type SolExodusParameters = { keysDerivationInstance: SolExodusKeyDerivation };

type ZecParameters = { keysDerivationInstance: TransparentKeyDerivation };

type AptParameters = {
  keysDerivationInstance: AptKeyDerivation;
  isMultiSig?: boolean;
  scheme: GetSignatureSchemeUnion<"ed25519" | "secp256k1" | "secp256r1">;
  isLegacy: boolean;
};

type CommonBipParameters = { keysDerivationInstance: CommonBipKeyDerivation };

type CommonBipParametersDerivationTypeUnion = GetDerivationTypeUnion<
  | "bchLegacy"
  | "btcLegacy"
  | "btcNativeSegWit"
  | "btcP2wsh"
  | "btcP2wshInP2sh"
  | "btcSegWit"
  | "dogeLegacy"
  | LtcDerivationTypeUnion
  | "trxBase"
>;

type GetDerivationHandlersParameters = Record<AvaxDerivationTypeUnion, AvaxParameters> &
  Record<GetDerivationTypeUnion<"btcTaproot">, BtcTaprootParameters> &
  Record<GetDerivationTypeUnion<"adaEnterprise" | "adaReward">, AdaCommonParameters> &
  Record<GetDerivationTypeUnion<"adaExodus">, AdaExoodusParameters> &
  Record<GetDerivationTypeUnion<"adaBase">, AdaBaseParameters> &
  Record<GetDerivationTypeUnion<"tonBase">, TonParameters> &
  Record<GetDerivationTypeUnion<"suiBase">, SuiParameters> &
  Record<XrpDerivationTypeUnion, XrpParameters> &
  Record<GetDerivationTypeUnion<"bnbBase">, BnbParameters> &
  Record<GetDerivationTypeUnion<"evmBase">, EvmParameters> &
  Record<GetDerivationTypeUnion<"dotStandardHd">, DotStandardHdParameters> &
  Record<GetDerivationTypeUnion<"dotBase">, DotBaseParameters> &
  Record<GetDerivationTypeUnion<"bchCashAddr">, BchParameters> &
  Record<GetDerivationTypeUnion<"solBase">, SolBaseParameters> &
  Record<GetDerivationTypeUnion<"solExodus">, SolExodusParameters> &
  Record<GetDerivationTypeUnion<"zecTransparent">, ZecParameters> &
  Record<AptDerivationTypeUnion, AptParameters> &
  Record<CommonBipParametersDerivationTypeUnion, CommonBipParameters>;

type GetDerivationHandlersReturnType<T extends DerivationTypeUnion> = {
  deriveItemFromMnemonic: DeriveItemFromMnemonic<T>;
  getCredentialFromPK: GetCredentialFromPK<T>;
  deriveItemsBatchFromMnemonic: DeriveItemsBatchFromMnemonic<T>;
  doesPKBelongToMnemonic: DoesPKBelongToMnemonic<T>;
};

export { type GetDerivationHandlersParameters, type GetDerivationHandlersReturnType };
