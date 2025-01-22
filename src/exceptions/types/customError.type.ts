import { type AddressError } from "../addressError.exception.js";
import { type KeyDerivationError } from "../keyDerivationError.exception.js";
import { type NetworkError } from "../networkError.exception.js";

type CustomError =
  | typeof AddressError
  | typeof NetworkError
  | typeof Error
  | typeof KeyDerivationError;

export { CustomError };
