import { type ValueOf } from "@/types/index.js";
import { DerivationPath } from "@/enums/index.js";
import { type AbstractAddress, type Address } from "../types/index.js";
import { networks } from "bitcoinjs-lib";
import {
  AvaxXAddress,
  BnbAddress,
  CashAddrAddress,
  EvmAddress,
  P2pkhAddress,
  P2wpkhAddress,
  XrpAddress,
  ZcashTransparentAddress,
  TaprootAddress,
  P2wpkhInP2shAddress,
} from "../common/index.js";
import { SolanaAddress } from "../solana/index.js";
import { CardanoAddress } from "../cardano/index.js";

const derivationPathToAddress: Record<
  ValueOf<typeof DerivationPath>,
  Address<ValueOf<typeof DerivationPath>>
> = {
  [DerivationPath.TAPROOT_BTC]: {
    config: {
      derivationPath: DerivationPath.TAPROOT_BTC,
      keysConfig: networks.bitcoin,
    },
    createAddressInstance: (addressConfig, mnemonic) => {
      return new TaprootAddress(addressConfig, mnemonic);
    },
  },
  [DerivationPath.NATIVE_SEG_WIT_BTC]: {
    config: {
      derivationPath: DerivationPath.NATIVE_SEG_WIT_BTC,
      keysConfig: networks.bitcoin,
    },
    createAddressInstance: (addressConfig, mnemonic) => {
      return new P2wpkhAddress(addressConfig, mnemonic);
    },
  },
  [DerivationPath.SEG_WIT_BTC]: {
    config: {
      derivationPath: DerivationPath.SEG_WIT_BTC,
      keysConfig: networks.bitcoin,
    },
    createAddressInstance: (addressConfig, mnemonic) => {
      return new P2wpkhInP2shAddress(addressConfig, mnemonic);
    },
  },
  [DerivationPath.LEGACY_BTC]: {
    config: {
      derivationPath: DerivationPath.LEGACY_BTC,
      keysConfig: networks.bitcoin,
    },
    createAddressInstance: (addressConfig, mnemonic) => {
      return new P2pkhAddress(addressConfig, mnemonic);
    },
  },
  [DerivationPath.LEGACY_DOGE]: {
    config: {
      derivationPath: DerivationPath.LEGACY_DOGE,
      keysConfig: {
        messagePrefix: "\x19Dogecoin Signed Message:\n",
        bech32: "doge",
        bip32: {
          public: 0x02facafd,
          private: 0x02fac398,
        },
        pubKeyHash: 0x1e,
        scriptHash: 0x16,
        wif: 0x9e,
      },
    },
    createAddressInstance: (addressConfig, mnemonic) => {
      return new P2pkhAddress(addressConfig, mnemonic);
    },
  },
  [DerivationPath.CASH_ADDR_BCH]: {
    config: {
      derivationPath: DerivationPath.CASH_ADDR_BCH,
      keysConfig: networks.bitcoin,
    },
    createAddressInstance: (addressConfig, mnemonic) => {
      return new CashAddrAddress(addressConfig, mnemonic);
    },
  },
  [DerivationPath.XRP]: {
    config: {
      derivationPath: DerivationPath.XRP,
      keysConfig: networks.bitcoin,
    },
    createAddressInstance: (addressConfig, mnemonic) => {
      return new XrpAddress(addressConfig, mnemonic);
    },
  },
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
  [DerivationPath.ZEC_TRANSPARENT]: {
    config: {
      derivationPath: DerivationPath.ZEC_TRANSPARENT,
      keysConfig: {
        messagePrefix: "\x18Zcash Signed Message:\n",
        bech32: "t1",
        bip32: {
          public: 0x0488b21e,
          private: 0x0488ade4,
        },
        pubKeyHash: 0x1cb8,
        scriptHash: 0x1cbd,
        wif: 0x80,
      },
    },
    createAddressInstance: (addressConfig, mnemonic) => {
      return new ZcashTransparentAddress(addressConfig, mnemonic);
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
  [DerivationPath.AVAX_X]: {
    config: {
      derivationPath: DerivationPath.AVAX_X,
      keysConfig: networks.bitcoin,
    },
    createAddressInstance: (addressConfig, mnemonic) => {
      return new AvaxXAddress(addressConfig, mnemonic);
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
  [DerivationPath.MULTI_BIT_HD_LEGACY_BTC]: {
    config: {
      derivationPath: DerivationPath.MULTI_BIT_HD_LEGACY_BTC,
      keysConfig: networks.bitcoin,
    },
    createAddressInstance: (addressConfig, mnemonic) => {
      return new P2pkhAddress(addressConfig, mnemonic);
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
