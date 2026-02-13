import { NetworkId } from "@stricahq/typhonjs/dist/types.js";

import type { AdaNetworkPurposeUnion } from "@/modules/network/libs/types/index.js";

function getNetworkId(networkPurpose: AdaNetworkPurposeUnion): number {
  switch (networkPurpose) {
    case "mainnet": {
      return NetworkId.MAINNET;
    }

    case "testnetPreprod":
    case "testnetPreview": {
      return NetworkId.TESTNET;
    }
  }
}

export { getNetworkId };
