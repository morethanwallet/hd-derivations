import { type AddressList } from "@/address/enums/index.js";

type CardanoAddress =
  | typeof AddressList.ADA_BASE
  | typeof AddressList.ADA_ENTERPRISE
  | typeof AddressList.ADA_REWARD;

export { type CardanoAddress };
