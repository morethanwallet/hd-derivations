type ContractVersion =
  | "v1r1"
  | "v1r2"
  | "v1r3"
  | "v2r1"
  | "v2r2"
  | "v3r1"
  | "v3r2"
  | "v4r1"
  | "v5r1";

type WorkChain = -1 | 0;

type TonAddressRequiredData = {
  workChain: WorkChain;
  contractVersion: ContractVersion;
  isFriendlyFormat: boolean;
  friendlyFormatArguments?: {
    urlSafe?: boolean;
    bounceable?: boolean;
    testOnly?: boolean;
  };
};

export { type TonAddressRequiredData };
