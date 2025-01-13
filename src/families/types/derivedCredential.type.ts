import { type DerivedItemAddress } from "./derivedItemAddress.type.js";
import { type DerivedKeyPair } from "./derivedKeyPair.type.js";
import { type NetworksTypesUnion } from "./networksTypeUnion.type.js";

type DerivedCredential<TNetworkType extends NetworksTypesUnion> = DerivedItemAddress &
  DerivedKeyPair;

export { type DerivedCredential };
