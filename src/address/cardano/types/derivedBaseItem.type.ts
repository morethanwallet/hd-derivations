import { type BaseDerivationKeyPair } from "./index.js";

type DerivedBaseItem = {
  address: string;
  enterpriseDerivationPath: string;
  rewardDerivationPath: string;
} & BaseDerivationKeyPair;

export { type DerivedBaseItem };
