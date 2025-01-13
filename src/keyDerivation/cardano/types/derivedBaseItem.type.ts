import { type DerivedItemAddress } from "@/keyDerivation/types/index.js";
import { type DerivedBaseKeyPair } from "./index.js";

type DerivedBaseItem = {
  enterpriseDerivationPath: string;
  rewardDerivationPath: string;
} & DerivedBaseKeyPair &
  DerivedItemAddress;

export { type DerivedBaseItem };
