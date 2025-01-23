import { Mnemonic } from "@/libs/modules/mnemonic/index.js";
import { ExceptionMessage } from "./libs/enums/index.js";
import { Bitcoin } from "./bitcoin/index.js";
import { Ada } from "./ada/index.js";
import { Avax } from "./avax/index.js";
import { Trx } from "./trx/index.js";
import { Ton } from "./ton/index.js";
import type {
  AdaDerivationConfig,
  AdaNetworkPurposeUnion,
  AvaxDerivationConfig,
  BtcDerivationConfig,
  CommonNetworkPurposeRegTestExtendedUnion,
  CommonNetworkPurposeUnion,
  NetworkTypeUnion,
  TonDerivationConfig,
  TrxDerivationConfig,
} from "./libs/types/index.js";

type NetworkTypeToAvailableDerivationConfigsMap = {
  btc: BtcDerivationConfig[];
  ada: AdaDerivationConfig[];
  avax: AvaxDerivationConfig[];
  trx: TrxDerivationConfig[];
  ton: TonDerivationConfig[];
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
  ada: InstanceType<typeof Ada>;
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
            derivationConfigs: derivationConfigs as BtcDerivationConfig[],
          }) as Network[T];
        }
        break;
      case "ada":
        {
          this.network = new Ada({
            mnemonic: mnemonicInstance,
            networkPurpose: networkPurpose as AdaNetworkPurposeUnion,
            derivationConfigs: derivationConfigs as AdaDerivationConfig[],
          }) as Network[T];
        }
        break;
      case "avax":
        {
          this.network = new Avax({
            mnemonic: mnemonicInstance,
            networkPurpose: networkPurpose as CommonNetworkPurposeUnion,
            derivationConfigs: derivationConfigs as AvaxDerivationConfig[],
          }) as Network[T];
        }
        break;
      case "trx":
        {
          this.network = new Trx({
            mnemonic: mnemonicInstance,
            networkPurpose: networkPurpose as null,
            derivationConfigs: derivationConfigs as TrxDerivationConfig[],
          }) as Network[T];
        }
        break;
      case "ton":
        {
          this.network = new Ton({
            mnemonic: mnemonicInstance,
            networkPurpose: networkPurpose as CommonNetworkPurposeUnion,
            derivationConfigs: derivationConfigs as TonDerivationConfig[],
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
