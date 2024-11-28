import { type AddressError } from "@/address/exceptions/index.js";

type CustomError = typeof AddressError | typeof Error;

export { CustomError };
