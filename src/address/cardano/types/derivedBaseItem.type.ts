import { type DerivedItemAddress } from "@/address/types/index.js";
import { type BaseDerivationKeyPair } from "./index.js";

type DerivedBaseItem = {
  enterpriseDerivationPath: string;
  rewardDerivationPath: string;
} & BaseDerivationKeyPair &
  DerivedItemAddress;

export { type DerivedBaseItem };
