import { type DerivationTypeMap, type DerivationTypeUnion } from "@/types/derivation/index.js";
import { type CommonInconsistentOuterHandlerDerivationParameters } from "./commonInconsistentOuterHandlerDerivationParameters.type.js";
import { type CardanoBaseKeyPair, type CommonKeyPair } from "@/types/keys/index.js";
import { type DerivedCredential } from "./derivedCredential.type.js";

type PrivateKey<TDerivationType extends DerivationTypeUnion> =
  TDerivationType extends DerivationTypeMap["adaBase"]
    ? {
        enterprisePrivateKey: CardanoBaseKeyPair["enterprisePrivateKey"];
        rewardPrivateKey: CardanoBaseKeyPair["rewardPrivateKey"];
      }
    : { privateKey: CommonKeyPair["privateKey"] };

type GetCredentialFromPrivateKeyInnerHandlerParameters<
  TDerivationType extends DerivationTypeUnion
> = PrivateKey<TDerivationType>;

type GetCredentialFromPrivateKeyInnerHandler<TDerivationType extends DerivationTypeUnion> = (
  parameters: GetCredentialFromPrivateKeyInnerHandlerParameters<TDerivationType>
) => DerivedCredential<TDerivationType>;

type GetCredentialFromPrivateKeyParameters<TDerivationType extends DerivationTypeUnion> =
  PrivateKey<TDerivationType> & CommonInconsistentOuterHandlerDerivationParameters<TDerivationType>;

type GetCredentialFromPrivateKey<TDerivationType extends DerivationTypeUnion> = (
  parameters: GetCredentialFromPrivateKeyParameters<TDerivationType>
) => DerivedCredential<TDerivationType>;

export {
  type GetCredentialFromPrivateKey,
  type GetCredentialFromPrivateKeyParameters,
  type GetCredentialFromPrivateKeyInnerHandler,
  type GetCredentialFromPrivateKeyInnerHandlerParameters,
};
