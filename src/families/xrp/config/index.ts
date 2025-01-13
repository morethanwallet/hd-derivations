import { type KeysConfig } from "@/keys/types/index.js";
import { networks } from "bitcoinjs-lib";

type Config = {
  keysConfig: KeysConfig;
};

const config: Config = {
  keysConfig: networks.bitcoin,
};

export { config };
