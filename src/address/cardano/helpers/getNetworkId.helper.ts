import { type NetworkPurpose } from "@/network/cardano/index.js";
import { NetworkInfo } from "@emurgo/cardano-serialization-lib-nodejs";

function getNetworkId(networkPurpose: NetworkPurpose): number {
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
