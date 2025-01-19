import {
  type DerivedCredential,
  type DerivationTypeUnion,
  type DerivationTypeMap,
} from "@/types/index.js";
import { type CardanoBaseKeyPair, type CommonKeyPair } from "@/keyDerivation/types/index.js";
import { type CommonInconsistentOuterHandlerDerivationParameters } from "./commonInconsistentOuterHandlerDerivationParameters.type.js";

type GetCredentialFromPrivateKeyParametersKeys<TDerivationType extends DerivationTypeUnion> =
  TDerivationType extends DerivationTypeMap["adaBase"]
    ? {
        enterprisePrivateKey: CardanoBaseKeyPair["enterprisePrivateKey"];
        rewardPrivateKey: CardanoBaseKeyPair["rewardPrivateKey"];
      }
    : {
        privateKey: CommonKeyPair["privateKey"];
      };

type GetCredentialFromPrivateKeyInnerHandlerParameters<
  TDerivationType extends DerivationTypeUnion
> = GetCredentialFromPrivateKeyParametersKeys<TDerivationType>;

type GetCredentialFromPrivateKeyParameters<TDerivationType extends DerivationTypeUnion> =
  GetCredentialFromPrivateKeyParametersKeys<TDerivationType> &
    CommonInconsistentOuterHandlerDerivationParameters<TDerivationType>;

type GetCredentialFromPrivateKey<TDerivationType extends DerivationTypeUnion> = (
  parameters: GetCredentialFromPrivateKeyParameters<TDerivationType>
) => DerivedCredential<TDerivationType>;

export {
  type GetCredentialFromPrivateKey,
  type GetCredentialFromPrivateKeyParameters,
  type GetCredentialFromPrivateKeyInnerHandlerParameters,
};
