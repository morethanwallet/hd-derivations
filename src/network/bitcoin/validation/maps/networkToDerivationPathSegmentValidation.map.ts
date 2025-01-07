import { DerivationPathSegmentToAllowedValue } from "@/network/types/validation.type.js";
import { type BitcoinNetwork } from "../../types/network.type.js";

const LEGACY_ADDRESS_PURPOSE = "44";
const COMMON_COINS = ["0", "1"];
const COMMON_PURPOSES = [LEGACY_ADDRESS_PURPOSE, "49", "84", "86"];

const networkToDerivationPathSegmentValidation: Record<
  BitcoinNetwork,
  DerivationPathSegmentToAllowedValue
> = {
  bitcoin: { purpose: COMMON_PURPOSES, coin: COMMON_COINS },
  bitcoinCore: { purpose: COMMON_PURPOSES, coin: COMMON_COINS },
  multiBitHd: { purpose: LEGACY_ADDRESS_PURPOSE, coin: COMMON_COINS },
};

export { networkToDerivationPathSegmentValidation };
