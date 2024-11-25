import { type ValueOf } from "@/types/index.js";
import { DerivationPath } from "@/enums/index.js";
import { type AbstractAddress, type Address } from "../types/index.js";
import { networks } from "bitcoinjs-lib";
import { AvaxAddress, BnbAddress, EvmAddress } from "../common/index.js";
import { SolanaAddress } from "../solana/index.js";
import { CardanoAddress } from "../cardano/index.js";

const derivationPathToAddress: Record<
  ValueOf<typeof DerivationPath>,
  Address<ValueOf<typeof DerivationPath>>
> = {
  [DerivationPath.SOL]: {
    config: {
      derivationPath: DerivationPath.SOL,
      keysConfig: networks.bitcoin,
    },
    createAddressInstance: (addressConfig, mnemonic) => {
      return new SolanaAddress(addressConfig, mnemonic);
    },
  },
  [DerivationPath.ADA]: {
    config: {
      derivationPath: DerivationPath.ADA,
      keysConfig: networks.bitcoin,
    },
    createAddressInstance: (addressConfig, mnemonic) => {
      return new CardanoAddress(addressConfig, mnemonic);
    },
  },
  [DerivationPath.BNB]: {
    config: {
      derivationPath: DerivationPath.BNB,
      keysConfig: networks.bitcoin,
    },
    createAddressInstance: (addressConfig, mnemonic) => {
      return new BnbAddress(addressConfig, mnemonic);
    },
  },
  [DerivationPath.AVAX]: {
    config: {
      derivationPath: DerivationPath.AVAX,
      keysConfig: networks.bitcoin,
    },
    createAddressInstance: (addressConfig, mnemonic) => {
      return new AvaxAddress(addressConfig, mnemonic);
    },
  },
  [DerivationPath.AVAX_C]: {
    config: {
      derivationPath: DerivationPath.ETH,
      keysConfig: networks.bitcoin,
    },
    createAddressInstance: (addressConfig, mnemonic) => {
      return new EvmAddress(addressConfig, mnemonic);
    },
  },
  [DerivationPath.ETH]: {
    config: {
      derivationPath: DerivationPath.ETH,
      keysConfig: networks.bitcoin,
    },
    createAddressInstance: (addressConfig, mnemonic) => {
      return new EvmAddress(addressConfig, mnemonic);
    },
  },
  [DerivationPath.BSC]: {
    config: {
      derivationPath: DerivationPath.ETH,
      keysConfig: networks.bitcoin,
    },
    createAddressInstance: (addressConfig, mnemonic) => {
      return new EvmAddress(addressConfig, mnemonic);
    },
  },
  [DerivationPath.ETC]: {
    config: {
      derivationPath: DerivationPath.ETC,
      keysConfig: networks.bitcoin,
    },
    createAddressInstance: (addressConfig, mnemonic) => {
      return new EvmAddress(addressConfig, mnemonic);
    },
  },
  [DerivationPath.COINOMI_ETH]: {
    config: {
      derivationPath: DerivationPath.COINOMI_ETH,
      keysConfig: networks.bitcoin,
    },
    createAddressInstance: (addressConfig, mnemonic) => {
      return new EvmAddress(addressConfig, mnemonic);
    },
  },
  [DerivationPath.COINOMI_ETC]: {
    config: {
      derivationPath: DerivationPath.COINOMI_ETC,
      keysConfig: networks.bitcoin,
    },
    createAddressInstance: (addressConfig, mnemonic) => {
      return new EvmAddress(addressConfig, mnemonic);
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
