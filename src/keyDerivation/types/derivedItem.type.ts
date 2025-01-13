import { type DerivationType } from "../enums/index.js";
import { type CardanoDerivedBaseKeyPair } from "./cardanoDerivedBaseKeyPair.type.js";
import { type DerivationTypeUnion } from "./derivationTypeUnion.type.js";
import { type DerivedCredential } from "./derivedCredential.type.js";
import { type DerivedItemAddress } from "./derivedItemAddress.type.js";

type CardanoDerivedBaseItem = {
  enterpriseDerivationPath: string;
  rewardDerivationPath: string;
} & CardanoDerivedBaseKeyPair &
  DerivedItemAddress;

type DerivedItem<TDerivationType extends DerivationTypeUnion> =
  TDerivationType extends typeof DerivationType.ADA_BASE
    ? CardanoDerivedBaseItem
    : { derivationPath: string } & DerivedCredential<TDerivationType>;

export { type DerivedItem };
