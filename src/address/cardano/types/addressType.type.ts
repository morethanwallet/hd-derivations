type AddressType = "base" | "reward" | "enterprise" | "byron";

type ReturnTypeCompatibleAddressType = Exclude<AddressType, "base">;

export { type AddressType, type ReturnTypeCompatibleAddressType };
