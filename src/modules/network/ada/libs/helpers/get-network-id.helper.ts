import type { AdaNetworkPurposeUnion } from "@/modules/network/libs/types/index.js";
import { NetworkInfo } from "@emurgo/cardano-serialization-lib-nodejs";

function getNetworkId(networkPurpose: AdaNetworkPurposeUnion): number {
  switch (networkPurpose) {
    case "mainnet": {
      return NetworkInfo.mainnet().network_id();
    }
    case "testnetPreprod": {
      return NetworkInfo.testnet_preprod().network_id();
    }
    case "testnetPreview": {
      return NetworkInfo.testnet_preview().network_id();
    }
  }
}

export { getNetworkId };
