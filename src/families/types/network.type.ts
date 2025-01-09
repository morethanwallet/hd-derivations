import { type AbstractAddress } from "@/address/index.js";

type NetworkPurpose = "mainnet" | "testnet" | "regtest";

type AbstractNetwork = {
  derive: AbstractAddress["getData"];
  importByPrivateKey: AbstractAddress["importByPrivateKey"];
};

export { type NetworkPurpose, type AbstractNetwork };
