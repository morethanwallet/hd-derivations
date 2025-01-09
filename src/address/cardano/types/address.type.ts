import { type BaseAddressKeyPair } from "./index.js";

type DerivedBaseItem = {
  address: string;
  mnemonic: string;
  enterprisePath: string;
  rewardPath: string;
} & BaseAddressKeyPair;

export { type DerivedBaseItem };
