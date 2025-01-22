import { Bitcoin } from "./bitcoin/bitcoin.network.js";
import { Cardano } from "./cardano/cardano.network.js";
import { Mnemonic } from "@/mnemonic/index.js";
import { ExceptionMessage } from "./exceptions/index.js";
import {
  type CommonNetworkPurposeUnion,
  type AdaNetworkPurposeUnion,
  type CommonNetworkPurposeRegTestExtendedUnion,
  type NetworkTypeUnion,
} from "@/types/network/index.js";
import {
  type AvaxDerivationConfigs,
  type AdaDerivationConfigs,
  type BtcDerivationConfigs,
  type TrxDerivationConfigs,
  type TonDerivationConfigs,
} from "@/config/types/index.js";
import { Avax } from "./avax/avax.network.js";
import { Trx } from "./trx/trx.network.js";
import { Ton } from "./ton/ton.network.js";

type NetworkTypeToAvailableDerivationConfigsMap = {
  btc: BtcDerivationConfigs;
  ada: AdaDerivationConfigs;
  avax: AvaxDerivationConfigs;
  trx: TrxDerivationConfigs;
  ton: TonDerivationConfigs;
};

type NetworkTypeToNetworkPurpose = {
  btc: CommonNetworkPurposeRegTestExtendedUnion;
  ada: AdaNetworkPurposeUnion;
  avax: CommonNetworkPurposeUnion;
  trx: null;
  ton: CommonNetworkPurposeUnion;
};

type Network = {
  btc: InstanceType<typeof Bitcoin>;
  ada: InstanceType<typeof Cardano>;
  avax: InstanceType<typeof Avax>;
  trx: InstanceType<typeof Trx>;
  ton: InstanceType<typeof Ton>;
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
      case "avax":
        {
          this.network = new Avax({
            mnemonic: mnemonicInstance,
            networkPurpose: networkPurpose as CommonNetworkPurposeUnion,
            derivationConfigs: derivationConfigs as AvaxDerivationConfigs,
          }) as Network[T];
        }
        break;
      case "trx":
        {
          this.network = new Trx({
            mnemonic: mnemonicInstance,
            networkPurpose: networkPurpose as null,
            derivationConfigs: derivationConfigs as TrxDerivationConfigs,
          }) as Network[T];
        }
        break;
      case "ton":
        {
          this.network = new Ton({
            mnemonic: mnemonicInstance,
            networkPurpose: networkPurpose as CommonNetworkPurposeUnion,
            derivationConfigs: derivationConfigs as TonDerivationConfigs,
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
