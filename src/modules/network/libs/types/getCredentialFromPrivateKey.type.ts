import type { PrivateKey, DerivationTypeUnion } from "@/libs/types/index.js";
import { type DerivationTypeParameter } from "./derivationTypeParameter.type.js";
import { type DerivedCredential } from "./derivedCredential.type.js";
import { type TonAddressRequiredData } from "@/modules/address/index.js";
import type { CommonHandlersParameters } from "./commonHandlersParameters.type.js";

type HandlersCommonParameters<TDerivationType extends DerivationTypeUnion> =
  PrivateKey<TDerivationType> &
    (TDerivationType extends "tonBase" ? TonAddressRequiredData : Record<string, unknown>);

type GetCredentialFromPrivateKeyInnerHandlerParameters<
  TDerivationType extends DerivationTypeUnion
> = HandlersCommonParameters<TDerivationType> & CommonHandlersParameters<TDerivationType>;

type GetCredentialFromPrivateKeyInnerHandler<TDerivationType extends DerivationTypeUnion> = (
  parameters: GetCredentialFromPrivateKeyInnerHandlerParameters<TDerivationType>
) => DerivedCredential<TDerivationType>;

type GetCredentialFromPrivateKeyParameters<TDerivationType extends DerivationTypeUnion> =
  HandlersCommonParameters<TDerivationType> & DerivationTypeParameter<TDerivationType>;

type GetCredentialFromPrivateKey<TDerivationType extends DerivationTypeUnion> = (
  parameters: GetCredentialFromPrivateKeyParameters<TDerivationType>
) => DerivedCredential<TDerivationType>;

export {
  type GetCredentialFromPrivateKey,
  type GetCredentialFromPrivateKeyParameters,
  type GetCredentialFromPrivateKeyInnerHandler,
  type GetCredentialFromPrivateKeyInnerHandlerParameters,
};
