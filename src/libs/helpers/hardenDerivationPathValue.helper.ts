import {
  DECIMAL_SYSTEM_IDENTIFIER,
  HARDEN_RANGE_START_INDEX,
} from "@/libs/constants/index.js";

function hardenDerivationPathValue(value: string | number): number {
  const formattedValue =
    typeof value === "string"
      ? Number.parseInt(value, DECIMAL_SYSTEM_IDENTIFIER)
      : value;

  return HARDEN_RANGE_START_INDEX + formattedValue;
}

export { hardenDerivationPathValue };
