import { type DerivedItemAddress } from "@/keyDerivation/types/index.js";
import { type DerivedBaseKeyPair } from "./derivedBaseKeyPair.type.js";

type DerivedBaseItem = {
  enterpriseDerivationPath: string;
  rewardDerivationPath: string;
} & DerivedBaseKeyPair &
  DerivedItemAddress;

export { type DerivedBaseItem };
