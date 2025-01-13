import { type DerivedCredential } from "./derivedCredential.type.js";
import { type NetworksTypesUnion } from "./networksTypeUnion.type.js";

type DerivedItem<TNetworkType extends NetworksTypesUnion> = {
  derivationPath: string;
} & DerivedCredential<TNetworkType>;

export { type DerivedItem };
