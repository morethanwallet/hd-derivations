import { type CommonNetworkPurposeRegTestExtendedUnion } from "@/types/network/index.js";
import { networks } from "bitcoinjs-lib";

function getCommonLegacyKeysConfig(networkPurpose: CommonNetworkPurposeRegTestExtendedUnion) {
  return networkPurpose === "mainnet"
    ? { keysConfig: networks.bitcoin }
    : networkPurpose === "testnet"
    ? { keysConfig: networks.testnet }
    : { keysConfig: networks.regtest };
}

export { getCommonLegacyKeysConfig };
