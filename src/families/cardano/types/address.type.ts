import { type AddressType } from "@/address/enums/index.js";

type CardanoAddress =
  | typeof AddressType.ADA_BASE
  | typeof AddressType.ADA_ENTERPRISE
  | typeof AddressType.ADA_REWARD;

export { type CardanoAddress };
