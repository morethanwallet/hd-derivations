import { type CommonNetworkPurposeRegTestExtendedUnion } from "@/families/types/index.js";
import { networks } from "bitcoinjs-lib";

function getCommonLegacyKeysConfig(networkPurpose: CommonNetworkPurposeRegTestExtendedUnion) {
  return networkPurpose === "mainnet"
    ? networks.bitcoin
    : networkPurpose === "testnet"
    ? networks.testnet
    : networks.regtest;
}

export { getCommonLegacyKeysConfig };
