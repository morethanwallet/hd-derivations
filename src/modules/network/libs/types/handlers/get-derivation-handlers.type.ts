import type {
  TaprootKeyDerivation,
  CommonBipKeyDerivation,
  CommonEd25519KeyDerivation,
  SuiKeyDerivation,
  BnbKeyDerivation,
  EvmKeyDerivation,
  SolKeyDerivation,
  TransparentKeyDerivation,
  AptKeyDerivation,
  AdaKeyDerivation,
  DotKeyDerivation,
} from "@/libs/modules/key-derivation/index.js";
import type {
  BtcDerivationTypeUnion,
  GetDerivationTypeUnion,
  AvaxDerivationTypeUnion,
  AdaDerivationTypeUnion,
  DerivationTypeUnion,
  XrpDerivationTypeUnion,
  GetSignatureSchemeUnion,
  AptDerivationTypeUnion,
  DotDerivationTypeUnion,
} from "@/libs/types/index.js";
import { type DeriveItemFromMnemonic } from "./derive-item-from-mnemonic.type.js";
import { type GetCredentialFromPK } from "./get-credential-from-p-k.type.js";
import { type DeriveItemsBatchFromMnemonic } from "./derive-items-batch-from-mnemonic.type.js";
import { type DoesPKBelongToMnemonic } from "./does-p-k-belong-to-mnemonic.type.js";
import type { CommonNetworkPurposeUnion } from "../network-purpose-union.type.js";
import type { TonAddressDerivationConfig } from "../ton-address-derivation-config.type.js";
import type { DestinationTagProperty, Ss58Format } from "@/libs/modules/address/index.js";

type AvaxParameters = {
  prefix: string;
  keysDerivationInstance: CommonBipKeyDerivation;
};

type BtcParameters<TDerivationType extends DerivationTypeUnion> =
  TDerivationType extends GetDerivationTypeUnion<"btcTaproot">
    ? { keysDerivationInstance: TaprootKeyDerivation }
    : { keysDerivationInstance: CommonBipKeyDerivation };

type AdaParameters = {
  networkId: number;
  keysDerivationInstance: AdaKeyDerivation;
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

type DotParameters<T extends DotDerivationTypeUnion> =
  (T extends GetDerivationTypeUnion<"dotStandardHd">
    ? { keysDerivationInstance: CommonEd25519KeyDerivation }
    : {
        keysDerivationInstance: DotKeyDerivation;
        scheme: GetSignatureSchemeUnion<"ed25519" | "secp256k1" | "sr25519">;
      }) &
    Ss58Format;

type BchParameters = { keysDerivationInstance: CommonBipKeyDerivation; isRegtest: boolean };

type SolParameters = { keysDerivationInstance: SolKeyDerivation };

type ZecParameters = { keysDerivationInstance: TransparentKeyDerivation };

type AptParameters = {
  keysDerivationInstance: AptKeyDerivation;
  isMultiSig?: boolean;
  scheme: GetSignatureSchemeUnion<"ed25519" | "secp256k1" | "secp256r1">;
  isLegacy: boolean;
};

type GetDerivationHandlersParameters<T extends DerivationTypeUnion> =
  T extends AvaxDerivationTypeUnion
    ? AvaxParameters
    : T extends BtcDerivationTypeUnion
      ? BtcParameters<T>
      : T extends AdaDerivationTypeUnion
        ? AdaParameters
        : T extends GetDerivationTypeUnion<"tonBase">
          ? TonParameters
          : T extends GetDerivationTypeUnion<"suiBase">
            ? SuiParameters
            : T extends XrpDerivationTypeUnion
              ? XrpParameters
              : T extends GetDerivationTypeUnion<"bnbBase">
                ? BnbParameters
                : T extends GetDerivationTypeUnion<"evmBase">
                  ? EvmParameters
                  : T extends DotDerivationTypeUnion
                    ? DotParameters<T>
                    : T extends GetDerivationTypeUnion<"bchCashAddr">
                      ? BchParameters
                      : T extends GetDerivationTypeUnion<"solBase">
                        ? SolParameters
                        : T extends GetDerivationTypeUnion<"zecTransparent">
                          ? ZecParameters
                          : T extends AptDerivationTypeUnion
                            ? AptParameters
                            : { keysDerivationInstance: CommonBipKeyDerivation };

type GetDerivationHandlersReturnType<T extends DerivationTypeUnion> = {
  deriveItemFromMnemonic: DeriveItemFromMnemonic<T>;
  getCredentialFromPK: GetCredentialFromPK<T>;
  deriveItemsBatchFromMnemonic: DeriveItemsBatchFromMnemonic<T>;
  doesPKBelongToMnemonic: DoesPKBelongToMnemonic<T>;
};

export { type GetDerivationHandlersParameters, type GetDerivationHandlersReturnType };
