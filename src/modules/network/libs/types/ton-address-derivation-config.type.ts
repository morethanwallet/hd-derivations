import type {
  TonAddressFriendlyFormatArguments,
  TonAddressRequiredData,
} from "@/libs/modules/address/address.js";

type TonAddressDerivationConfig = Pick<
  TonAddressRequiredData,
  "contractVersion" | "workChain" | "isFriendlyFormat"
> & {
  friendlyFormatArguments?: {
    bounceable: TonAddressFriendlyFormatArguments["bounceable"];
    urlSafe: TonAddressFriendlyFormatArguments["urlSafe"];
  };
};

export type { TonAddressDerivationConfig };
