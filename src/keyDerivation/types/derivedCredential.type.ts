// import { type CardanoDerivedBaseKeyPair } from "./cardanoDerivedBaseKeyPair.type.js";
// import { type DerivationType } from "../enums/index.js";
// import { type DerivedKeyPair } from "./derivedKeyPair.type.js";
// import { type DerivationTypeUnion } from "./derivationTypeUnion.type.js";
// import { type DerivedItemAddress } from "./derivedItemAddress.type.js";

type DerivedCredential<TDerivationType extends DerivationTypeUnion> = DerivedItemAddress &
  (TDerivationType extends typeof DerivationType.ADA_BASE
    ? CardanoDerivedBaseKeyPair
    : DerivedKeyPair);

// export { type DerivedCredential };
