import { Bitcoin } from "./bitcoin/bitcoin.network.js";
import { Cardano } from "./cardano/cardano.network.js";
import { Mnemonic } from "@/mnemonic/index.js";
import { ExceptionMessage } from "./exceptions/index.js";
import {
  type AdaNetworkPurposeUnion,
  type CommonNetworkPurposeRegTestExtendedUnion,
  type NetworkTypeUnion,
} from "@/types/network/index.js";
import { type AdaDerivationConfigs, type BtcDerivationConfigs } from "@/types/config/index.js";

type NetworkTypeToAvailableDerivationConfigsMap = {
  btc: BtcDerivationConfigs;
  ada: AdaDerivationConfigs;
};

type NetworkTypeToNetworkPurpose = {
  btc: CommonNetworkPurposeRegTestExtendedUnion;
  ada: AdaNetworkPurposeUnion;
};

type Network = {
  btc: InstanceType<typeof Bitcoin>;
  ada: InstanceType<typeof Cardano>;
};

class NetworkFacade<T extends NetworkTypeUnion> {
  private network: Network[T];

  constructor({
    network,
    mnemonic,
    networkPurpose,
    derivationConfigs,
  }: {
    network: T;
    mnemonic: string;
    networkPurpose: NetworkTypeToNetworkPurpose[T];
    derivationConfigs: NetworkTypeToAvailableDerivationConfigsMap[T];
  }) {
    const mnemonicInstance = new Mnemonic(mnemonic);

    // TODO: Fix assertions
    switch (network) {
      case "btc":
        {
          this.network = new Bitcoin({
            mnemonic: mnemonicInstance,
            networkPurpose: networkPurpose as CommonNetworkPurposeRegTestExtendedUnion,
            derivationConfigs: derivationConfigs as BtcDerivationConfigs,
          }) as Network[T];
        }
        break;
      case "ada":
        {
          this.network = new Cardano({
            mnemonic: mnemonicInstance,
            networkPurpose: networkPurpose as AdaNetworkPurposeUnion,
            derivationConfigs: derivationConfigs as AdaDerivationConfigs,
          }) as Network[T];
        }
        break;
      default:
        throw new Error(ExceptionMessage.NETWORK_IS_NOT_SUPPORTED);
    }
  }

  public getNetwork(): Network[T] {
    return this.network;
  }
}

export { NetworkFacade };
