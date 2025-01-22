import { type TonInstanceConfig } from "@/config/types/index.js";

const tonConfig = {
  tonBase: { derivationPathPrefix: "m/44'/607'" },
};

const defaultTonInstanceConfig: TonInstanceConfig = {
  network: "ton",
  mnemonic: "",
  networkPurpose: "mainnet",
  derivationConfigs: [{ derivationType: "tonBase" }],
};

export { tonConfig, defaultTonInstanceConfig };
