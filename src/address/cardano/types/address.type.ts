import { type BaseAddressKeyPair } from "./index.js";

type BaseAddressData = {
  address: string;
  mnemonic: string;
  enterprisePath: string;
  rewardPath: string;
} & BaseAddressKeyPair;

export { type BaseAddressData };
