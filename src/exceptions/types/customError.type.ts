import { type AddressError } from "../addressError.exception.js";

type CustomError = typeof AddressError | typeof Error;

export { CustomError };
