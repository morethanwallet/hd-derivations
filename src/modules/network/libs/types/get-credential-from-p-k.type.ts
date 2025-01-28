import type { PrivateKey, DerivationTypeUnion } from "@/libs/types/index.js";
import { type DerivationTypeParameter } from "./derivation-type-parameter.type.js";
import { type DerivedCredential } from "./derived-credential.type.js";
import { type TonAddressRequiredData } from "@/libs/modules/address/index.js";
import type { CommonHandlersParameters } from "./common-handlers-parameters.type.js";

type HandlersCommonParameters<TDerivationType extends DerivationTypeUnion> =
  PrivateKey<TDerivationType> &
    (TDerivationType extends "tonBase" ? TonAddressRequiredData : Record<string, unknown>);

type GetCredentialFromPKInnerHandlerParameters<TDerivationType extends DerivationTypeUnion> =
  HandlersCommonParameters<TDerivationType> & CommonHandlersParameters<TDerivationType>;

type GetCredentialFromPKInnerHandler<TDerivationType extends DerivationTypeUnion> = (
  parameters: GetCredentialFromPKInnerHandlerParameters<TDerivationType>,
) => DerivedCredential<TDerivationType>;

type GetCredentialFromPKParameters<TDerivationType extends DerivationTypeUnion> =
  HandlersCommonParameters<TDerivationType> & DerivationTypeParameter<TDerivationType>;

type GetCredentialFromPK<TDerivationType extends DerivationTypeUnion> = (
  parameters: GetCredentialFromPKParameters<TDerivationType>,
) => DerivedCredential<TDerivationType>;

export {
  type GetCredentialFromPK,
  type GetCredentialFromPKParameters,
  type GetCredentialFromPKInnerHandler,
  type GetCredentialFromPKInnerHandlerParameters,
};
