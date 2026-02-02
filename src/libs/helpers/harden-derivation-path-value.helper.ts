import { DECIMAL_SYSTEM_IDENTIFIER, HARDENED_RANGE_OFFSET } from "@/libs/constants/index.js";

function hardenDerivationPathValue(value: string | number): number {
  const formattedValue =
    typeof value === "string" ? Number.parseInt(value, DECIMAL_SYSTEM_IDENTIFIER) : value;

  return HARDENED_RANGE_OFFSET + formattedValue;
}

export { hardenDerivationPathValue };
