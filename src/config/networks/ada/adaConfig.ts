import { type AdaInstanceConfig } from "@/config/types/index.js";

const defaultAdaInstanceConfig: AdaInstanceConfig = {
  network: "ada",
  mnemonic: "",
  networkPurpose: "mainnet",
  derivationConfigs: [
    { derivationType: "enterprise" },
    { derivationType: "reward" },
    { derivationType: "adaBase" },
  ],
};

export { defaultAdaInstanceConfig };
