import type { CommonNetworkPurposeRegTestExtendedUnion } from "@/modules/network/libs/types/index.js";
import { networks } from "bitcoinjs-lib";

function getCommonLegacyKeysConfig(networkPurpose: CommonNetworkPurposeRegTestExtendedUnion) {
  return networkPurpose === "mainnet"
    ? { prefixConfig: networks.bitcoin }
    : networkPurpose === "testnet"
    ? { prefixConfig: networks.testnet }
    : { prefixConfig: networks.regtest };
}

export { getCommonLegacyKeysConfig };
