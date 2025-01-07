import { DERIVATION_PATH_DELIMITER } from "@/constants/index.js";
import { ExceptionMessage } from "@/exceptions/index.js";

type ValidateDerivationPathParameters = {
  derivationPath: string;
  allowedPurpose: string | string[];
  allowedCoin: string | string[];
};

const SegmentIndex = {
  PURPOSE: 1,
  COIN: 2,
} as const;

const SEGMENT_HARDENED_SUFFIX_INDEX = -1;
const SEGMENT_START_INDEX = 0;

function validateDerivationPath({
  derivationPath,
  allowedPurpose,
  allowedCoin,
}: ValidateDerivationPathParameters): void | never {
  const derivationPathArray = derivationPath.split(DERIVATION_PATH_DELIMITER);

  const purpose = derivationPathArray[SegmentIndex.PURPOSE]?.slice(
    SEGMENT_START_INDEX,
    SEGMENT_HARDENED_SUFFIX_INDEX
  );

  if (!purpose) throw new Error(ExceptionMessage.INVALID_DERIVATION_PATH);

  if (
    (typeof allowedPurpose === "string" && purpose !== allowedPurpose) ||
    (Array.isArray(allowedPurpose) && !allowedPurpose.includes(purpose))
  ) {
    throw new Error(ExceptionMessage.INVALID_PURPOSE);
  }

  const coin = derivationPathArray[SegmentIndex.COIN]?.slice(
    SEGMENT_START_INDEX,
    SEGMENT_HARDENED_SUFFIX_INDEX
  );

  if (!coin) throw new Error(ExceptionMessage.INVALID_DERIVATION_PATH);

  if (
    (typeof allowedCoin === "string" && coin !== allowedCoin) ||
    (Array.isArray(allowedCoin) && !allowedCoin.includes(coin))
  ) {
    throw new Error(ExceptionMessage.INVALID_COIN);
  }
}

export { validateDerivationPath };
