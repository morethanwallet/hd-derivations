import { type DeriveItemFromMnemonic } from "./derive-item-from-mnemonic.type.js";
import { type GetCredentialFromPK } from "./get-credential-from-p-k.type.js";
import { type DeriveItemsBatchFromMnemonic } from "./derive-items-batch-from-mnemonic.type.js";
import { type DoesPKBelongToMnemonic } from "./does-p-k-belong-to-mnemonic.type.js";
import type { CommonNetworkPurposeUnion } from "../network-purpose-union.type.js";
import type { TonAddressDerivationConfig } from "../ton-address-derivation-config.type.js";

import type {
  GetDerivationTypeUnion,
  DerivationTypeUnion,
  DerivationTypeUnionByNetwork,
} from "@/libs/types/types.js";
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
  DotBaseKeyDerivation,
  SolExodusKeyDerivation,
  TonExodusKeyDerivation,
  AdaExodusKeyDerivation,
  DotLedgerKeyDerivation,
  AdaLedgerKeyDerivation,
} from "@/libs/modules/key-derivation/networks.js";
import type { DestinationTagProperty, Ss58Format } from "@/libs/modules/address/address.js";
import type { Curve } from "@/libs/enums/enums.js";

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

type AdaLedgerParameters = {
  networkId: number;
  keysDerivationInstance: AdaLedgerKeyDerivation;
};

type TonCommonParameters = {
  networkPurpose: CommonNetworkPurposeUnion;
} & TonAddressDerivationConfig;

type TonBaseParameters = {
  keysDerivationInstance: CommonEd25519KeyDerivation;
} & TonCommonParameters;

type TonExodusParameters = {
  keysDerivationInstance: TonExodusKeyDerivation;
} & TonCommonParameters;

type SuiParameters = {
  keysDerivationInstance: SuiKeyDerivation;
  scheme: Curve["ED25519" | "SECP256K1" | "SECP256R1"];
};

type XrpParameters = {
  keysDerivationInstance: CommonBipKeyDerivation;
  isTestnet: boolean;
  derivationType: DerivationTypeUnionByNetwork["xrp"];
} & DestinationTagProperty;

type BnbParameters = { keysDerivationInstance: BnbKeyDerivation };

type EvmParameters = { keysDerivationInstance: EvmKeyDerivation };

type DotStandardHdParameters = {
  keysDerivationInstance: CommonEd25519KeyDerivation;
} & Ss58Format;

type DotLedgerParameters = {
  keysDerivationInstance: DotLedgerKeyDerivation;
} & Ss58Format;

type DotBaseParameters = {
  keysDerivationInstance: DotBaseKeyDerivation;
  scheme: Curve["ED25519" | "SECP256K1" | "SR25519"];
} & Ss58Format;

type BchParameters = { keysDerivationInstance: CommonBipKeyDerivation; isRegtest: boolean };

type SolBaseParameters = { keysDerivationInstance: SolBaseKeyDerivation };

type SolExodusParameters = { keysDerivationInstance: SolExodusKeyDerivation };

type ZecParameters = { keysDerivationInstance: TransparentKeyDerivation };

type AptParameters = {
  keysDerivationInstance: AptKeyDerivation;
  isMultiSig?: boolean;
  scheme: Curve["ED25519" | "SECP256K1" | "SECP256R1"];
  isLegacy: boolean;
};

type CommonBipParameters = { keysDerivationInstance: CommonBipKeyDerivation };

type CommonBipParametersDerivationTypeUnion = GetDerivationTypeUnion<
  | "btcLegacy"
  | "btcNativeSegWit"
  | "btcP2wsh"
  | "btcP2wshInP2sh"
  | "btcSegWit"
  | DerivationTypeUnionByNetwork["bch"]
  | DerivationTypeUnionByNetwork["doge"]
  | DerivationTypeUnionByNetwork["ltc"]
  | DerivationTypeUnionByNetwork["trx"]
>;

type GetDerivationHandlersParameters = Record<
  DerivationTypeUnionByNetwork["avax"],
  AvaxParameters
> &
  Record<GetDerivationTypeUnion<"btcTaproot">, BtcTaprootParameters> &
  Record<GetDerivationTypeUnion<"adaEnterprise" | "adaReward">, AdaCommonParameters> &
  Record<GetDerivationTypeUnion<"adaExodus">, AdaExoodusParameters> &
  Record<GetDerivationTypeUnion<"adaBase">, AdaBaseParameters> &
  Record<GetDerivationTypeUnion<"adaLedger">, AdaLedgerParameters> &
  Record<GetDerivationTypeUnion<"tonBase">, TonBaseParameters> &
  Record<GetDerivationTypeUnion<"tonExodus">, TonExodusParameters> &
  Record<GetDerivationTypeUnion<"suiBase">, SuiParameters> &
  Record<DerivationTypeUnionByNetwork["xrp"], XrpParameters> &
  Record<GetDerivationTypeUnion<"bnbBase">, BnbParameters> &
  Record<GetDerivationTypeUnion<"evmBase">, EvmParameters> &
  Record<GetDerivationTypeUnion<"dotStandardHd">, DotStandardHdParameters> &
  Record<GetDerivationTypeUnion<"dotLedger">, DotLedgerParameters> &
  Record<GetDerivationTypeUnion<"dotBase">, DotBaseParameters> &
  Record<GetDerivationTypeUnion<"bchCashAddr">, BchParameters> &
  Record<GetDerivationTypeUnion<"solBase">, SolBaseParameters> &
  Record<GetDerivationTypeUnion<"solExodus">, SolExodusParameters> &
  Record<GetDerivationTypeUnion<"zecTransparent">, ZecParameters> &
  Record<DerivationTypeUnionByNetwork["apt"], AptParameters> &
  Record<CommonBipParametersDerivationTypeUnion, CommonBipParameters>;

type GetDerivationHandlersReturnType<T extends DerivationTypeUnion> = {
  deriveItemFromMnemonic: DeriveItemFromMnemonic<T>;
  getCredentialFromPK: GetCredentialFromPK<T>;
  deriveItemsBatchFromMnemonic: DeriveItemsBatchFromMnemonic<T>;
  doesPKBelongToMnemonic: DoesPKBelongToMnemonic<T>;
};

export { type GetDerivationHandlersParameters, type GetDerivationHandlersReturnType };
