import { type ValueOf } from "@/types/index.js";
import { DerivationPath } from "@/enums/index.js";
import { type AbstractAddress, type Address } from "../types/index.js";
import { networks } from "bitcoinjs-lib";
import { CardanoAddress } from "../cardano/index.js";

const derivationPathToAddress: Record<
  ValueOf<typeof DerivationPath>,
  Address<ValueOf<typeof DerivationPath>>
> = {
  [DerivationPath.ADA]: {
    config: {
      derivationPath: DerivationPath.ADA,
      keysConfig: networks.bitcoin,
    },
    createAddressInstance: (addressConfig, mnemonic) => {
      return new CardanoAddress(addressConfig, mnemonic);
    },
  },
};

function getAddressInstance<T extends ValueOf<typeof DerivationPath>>(
  derivationPath: T,
  mnemonic?: string
): AbstractAddress<T> {
  const { config, createAddressInstance } = derivationPathToAddress[derivationPath];

  return createAddressInstance(config, mnemonic);
}

export { getAddressInstance };
