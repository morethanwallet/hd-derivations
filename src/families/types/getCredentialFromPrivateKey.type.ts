import {
  type DerivedCredential,
  type DerivationTypeMap,
  type DerivationTypeUnion,
} from "@/types/index.js";
import { type CommonInconsistentOuterHandlerDerivationParameters } from "./commonInconsistentOuterHandlerDerivationParameters.type.js";
import { type CardanoBaseKeyPair, type CommonKeyPair } from "@/keyDerivation/types/index.js";

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

type GetCredentialFromPrivateKeyParameters<TDerivationType extends DerivationTypeUnion> =
  PrivateKey<TDerivationType> & CommonInconsistentOuterHandlerDerivationParameters<TDerivationType>;

type GetCredentialFromPrivateKey<TDerivationType extends DerivationTypeUnion> = (
  parameters: GetCredentialFromPrivateKeyParameters<TDerivationType>
) => DerivedCredential<TDerivationType>;

export {
  type GetCredentialFromPrivateKey,
  type GetCredentialFromPrivateKeyParameters,
  type GetCredentialFromPrivateKeyInnerHandlerParameters,
};
