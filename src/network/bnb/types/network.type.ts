import { AbstractAddress } from "@/address/common/index.js";

type AbstractNetwork = {
  getAddressData: AbstractAddress["getData"];
  importByPrivateKey: AbstractAddress["importByPrivateKey"];
};

export { type AbstractNetwork };
