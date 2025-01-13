type NetworkPurposeUnion = "mainnet" | "testnet" | "regtest";

type AvaxNetworkPurposeUnion = Exclude<NetworkPurposeUnion, "regtest">;

export { type NetworkPurposeUnion, type AvaxNetworkPurposeUnion };
