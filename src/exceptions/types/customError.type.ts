import { type AddressError } from "@/address/exceptions/index.js";
import { type NetworkError } from "@/network/exceptions/index.js";

type CustomError = typeof AddressError | typeof NetworkError | typeof Error;

export { CustomError };
