import { type DeriveItemFromMnemonic } from "./deriveItemFromMnemonic.type.js";
import { type GetCredentialFromPrivateKey } from "./getCredentialFromPrivateKey.type.js";
import { type NetworksTypesUnion } from "./networksTypeUnion.type.js";

type AbstractNetwork<TNetworkType extends NetworksTypesUnion> = {
  deriveItemFromMnemonic: DeriveItemFromMnemonic<TNetworkType>;
  getCredentialFromPrivateKey: GetCredentialFromPrivateKey<TNetworkType>;
};

export { type AbstractNetwork };
