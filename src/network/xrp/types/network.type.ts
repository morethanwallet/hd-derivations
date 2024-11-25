import { type AbstractAddress } from "@/address/xrp/index.js";

type AbstractNetwork = {
  getAddressData: AbstractAddress["getData"];
  importByPrivateKey: AbstractAddress["importByPrivateKey"];
};

export { type AbstractNetwork };
