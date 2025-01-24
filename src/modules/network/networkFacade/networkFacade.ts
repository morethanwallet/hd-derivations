import { Mnemonic } from "@/libs/modules/mnemonic/index.js";
import { ExceptionMessage } from "../libs/enums/index.js";
import { Bitcoin } from "../bitcoin/index.js";
import { Ada } from "../ada/index.js";
import { Avax } from "../avax/index.js";
import { Trx } from "../trx/index.js";
import { Ton } from "../ton/index.js";
import type { NetworkTypeUnion } from "../libs/types/index.js";
import type { ConstructorParameters } from "./libs/types/index.js";

type Network = {
  btc: InstanceType<typeof Bitcoin>;
  ada: InstanceType<typeof Ada>;
  avax: InstanceType<typeof Avax>;
  trx: InstanceType<typeof Trx>;
  ton: InstanceType<typeof Ton>;
};

class NetworkFacade<T extends NetworkTypeUnion> {
  private network: Network[T];

  constructor({ network, mnemonic, networkPurpose, derivationConfigs }: ConstructorParameters<T>) {
    const mnemonicInstance = new Mnemonic(mnemonic);

    // TODO: Fix assertions
    switch (network) {
      case "btc":
        {
          this.network = new Bitcoin({
            networkPurpose,
            derivationConfigs,
            mnemonic: mnemonicInstance,
          }) as Network[T];
        }
        break;
      case "ada":
        {
          this.network = new Ada({
            mnemonic: mnemonicInstance,
            networkPurpose,
            derivationConfigs,
          }) as Network[T];
        }
        break;
      case "avax":
        {
          this.network = new Avax({
            networkPurpose,
            derivationConfigs,
            mnemonic: mnemonicInstance,
          }) as Network[T];
        }
        break;
      case "trx":
        {
          this.network = new Trx({
            networkPurpose,
            derivationConfigs,
            mnemonic: mnemonicInstance,
          }) as Network[T];
        }
        break;
      case "ton":
        {
          this.network = new Ton({
            networkPurpose,
            derivationConfigs,
            mnemonic: mnemonicInstance,
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
