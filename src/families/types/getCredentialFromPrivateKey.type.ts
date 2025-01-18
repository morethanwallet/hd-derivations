import {
  type DerivedCredential,
  type DerivationTypeUnion,
  type AdaDerivationTypeUnion,
  type DerivationTypeMap,
} from "@/types/index.js";
import { type CommonInconsistentDerivationParameters } from "./commonInconsistentDerivationParameters.type.js";
import { type CardanoBaseKeyPair, type CommonKeyPair } from "@/keyDerivation/types/index.js";
import { type CommonInconsistentParametersDerivationType } from "./commonInconsistentParametersDerivationType.type.js";

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
  GetCredentialFromPrivateKeyInnerHandlerParameters<TDerivationType> &
    CommonInconsistentDerivationParameters<TDerivationType> &
    CommonInconsistentParametersDerivationType<TDerivationType>;

type GetCredentialFromPrivateKey<TDerivationType extends DerivationTypeUnion> = (
  parameters: GetCredentialFromPrivateKeyParameters<TDerivationType>
) => DerivedCredential<TDerivationType>;

export {
  type GetCredentialFromPrivateKey,
  type GetCredentialFromPrivateKeyParameters,
  type GetCredentialFromPrivateKeyInnerHandlerParameters,
};
