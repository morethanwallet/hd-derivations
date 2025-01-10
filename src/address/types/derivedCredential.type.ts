import { type DerivationKeyPair, type DerivedItemAddress } from "./index.js";

type DerivedCredential = DerivedItemAddress & DerivationKeyPair;

export { type DerivedCredential };
