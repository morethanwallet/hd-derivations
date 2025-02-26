type ContractVersion =
  | "v1r1"
  | "v1r2"
  | "v1r3"
  | "v2r1"
  | "v2r2"
  | "v3r1"
  | "v3r2"
  | "v4r2"
  | "v5r1";

type TonAddressFriendlyFormatArguments = {
  urlSafe?: boolean;
  bounceable?: boolean;
  testOnly?: boolean;
};

type TonAddressRequiredData = {
  workChain: number;
  contractVersion: ContractVersion;
  isFriendlyFormat: boolean;
  friendlyFormatArguments?: TonAddressFriendlyFormatArguments;
};

export type { TonAddressRequiredData, TonAddressFriendlyFormatArguments };
