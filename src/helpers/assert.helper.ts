import { type CustomError } from "@/exceptions/index.js";

function assert(condition: unknown, error: CustomError, message: string): asserts condition {
  if (!condition) throw new error(message);
}

export { assert };
