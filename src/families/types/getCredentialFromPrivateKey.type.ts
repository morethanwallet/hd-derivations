import { type CommonInconsistentDerivationParameters } from "./commonInconsistentDerivationParameters.type.js";
import { type DerivedCredential } from "./derivedCredential.type.js";
import { type DerivedKeyPair } from "./derivedKeyPair.type.js";
import { type NetworksTypesUnion } from "./networksTypeUnion.type.js";

type GetCredentialFromPrivateKeyParameters<TNetworkType extends NetworksTypesUnion> = {
  privateKey: DerivedKeyPair["privateKey"];
} & CommonInconsistentDerivationParameters<TNetworkType>;

type GetCredentialFromPrivateKey<TNetworkType extends NetworksTypesUnion> = (
  parameters: GetCredentialFromPrivateKeyParameters<TNetworkType>
) => DerivedCredential<TNetworkType>;

export { type GetCredentialFromPrivateKey, type GetCredentialFromPrivateKeyParameters };
