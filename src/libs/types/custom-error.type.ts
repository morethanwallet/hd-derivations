import {
  type AddressError,
  type KeyDerivationError,
  type NetworkError,
} from "@/libs/exceptions/index.js";

type CustomError =
  | typeof AddressError
  | typeof NetworkError
  | typeof Error
  | typeof KeyDerivationError;

export { type CustomError };
