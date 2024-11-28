type AddressType = "base" | "reward" | "enterprise";

type ReturnTypeCompatibleAddressType = Exclude<AddressType, "base">;

export { type AddressType, type ReturnTypeCompatibleAddressType };
