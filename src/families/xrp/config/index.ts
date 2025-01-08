import { type KeysConfig } from "@/address/index.js";
import { networks } from "bitcoinjs-lib";

type Config = {
  keysConfig: KeysConfig;
};

const config: Config = {
  keysConfig: networks.bitcoin,
};

export { config };
