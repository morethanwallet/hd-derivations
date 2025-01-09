import { type AbstractAddress } from "@/address/index.js";

type NetworkPurpose = "mainnet" | "testnet" | "regtest";

type AbstractNetwork = {
  derive: AbstractAddress["derive"];
  importByPrivateKey: AbstractAddress["importByPrivateKey"];
};

export { type NetworkPurpose, type AbstractNetwork };
