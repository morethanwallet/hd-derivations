import type { AddressError, KeyDerivationError, NetworkError } from "@/libs/exceptions/index.js";

type CustomError =
  | typeof AddressError
  | typeof NetworkError
  | typeof Error
  | typeof KeyDerivationError;

export { CustomError };
