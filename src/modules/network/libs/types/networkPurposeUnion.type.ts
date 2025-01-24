type CommonNetworkPurposeUnion = "mainnet" | "testnet";

type CommonNetworkPurposeRegTestExtendedUnion =
  | CommonNetworkPurposeUnion
  | "regtest";

type AdaNetworkPurposeUnion = "mainnet" | "testnetPreview" | "testnetPreprod";

export {
  type CommonNetworkPurposeUnion,
  type CommonNetworkPurposeRegTestExtendedUnion,
  type AdaNetworkPurposeUnion,
};
