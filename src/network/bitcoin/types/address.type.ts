type BitcoinCoreAddress = "segWit" | "nativeSegWit" | "taproot" | "legacy";
type BitcoinAddress = "segWit" | "nativeSegWit" | "taproot" | "legacy" | "p2wsh" | "p2wshInP2sh";

export { type BitcoinCoreAddress, type BitcoinAddress };
