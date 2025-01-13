import { type AbstractAddress } from "@/keyDerivation/index.js";

type NetworkPurposeUnion = "mainnet" | "testnet" | "regtest";

type AbstractNetwork = {
  derive: AbstractAddress["derive"];
  importByPrivateKey: AbstractAddress["importByPrivateKey"];
};

export { type NetworkPurposeUnion, type AbstractNetwork };
