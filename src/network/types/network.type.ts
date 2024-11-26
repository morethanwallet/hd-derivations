import { AbstractAddress } from "@/address/common/index.js";

type NetworkPurpose = "mainnet" | "testnet" | "regtest";

type AbstractNetwork = {
  getAddressData: AbstractAddress["getData"];
  importByPrivateKey: AbstractAddress["importByPrivateKey"];
};

export { type NetworkPurpose, type AbstractNetwork };
