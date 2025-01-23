import type { PrivateKey, DerivationTypeUnion } from "@/libs/types/index.js";
import { type CommonInconsistentOuterHandlerDerivationParameters } from "./commonInconsistentOuterHandlerDerivationParameters.type.js";
import { type DerivedCredential } from "./derivedCredential.type.js";
import { type TonAddressRequiredData } from "@/modules/address/index.js";

type HandlersCommonParameters<TDerivationType extends DerivationTypeUnion> =
  PrivateKey<TDerivationType> &
    (TDerivationType extends "tonBase" ? TonAddressRequiredData : Record<string, unknown>);

type GetCredentialFromPrivateKeyInnerHandlerParameters<
  TDerivationType extends DerivationTypeUnion
> = HandlersCommonParameters<TDerivationType>;

type GetCredentialFromPrivateKeyInnerHandler<TDerivationType extends DerivationTypeUnion> = (
  parameters: GetCredentialFromPrivateKeyInnerHandlerParameters<TDerivationType>
) => DerivedCredential<TDerivationType>;

type GetCredentialFromPrivateKeyParameters<TDerivationType extends DerivationTypeUnion> =
  HandlersCommonParameters<TDerivationType> &
    CommonInconsistentOuterHandlerDerivationParameters<TDerivationType>;

type GetCredentialFromPrivateKey<TDerivationType extends DerivationTypeUnion> = (
  parameters: GetCredentialFromPrivateKeyParameters<TDerivationType>
) => DerivedCredential<TDerivationType>;

export {
  type GetCredentialFromPrivateKey,
  type GetCredentialFromPrivateKeyParameters,
  type GetCredentialFromPrivateKeyInnerHandler,
  type GetCredentialFromPrivateKeyInnerHandlerParameters,
};
