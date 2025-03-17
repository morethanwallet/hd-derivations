import { ALLOWED_MNEMONIC_LENGTHS } from "../constants";

const MNEMONIC_LENGTHS_LIST_DIVIDER = ", ";

const ExceptionMessage = {
  INVALID_MNEMONIC: "Mnemonic is invalid",
  EMPTY_MNEMONIC: "Mnemonic isn't provided",
  INVALID_MNEMONIC_LENGTH: `Mnemonic words length should be ${ALLOWED_MNEMONIC_LENGTHS.join(MNEMONIC_LENGTHS_LIST_DIVIDER)}`,
} as const;

export { ExceptionMessage };
