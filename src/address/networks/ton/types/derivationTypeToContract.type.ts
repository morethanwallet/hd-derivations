import {
  type WalletContractV1R1,
  type WalletContractV1R2,
  type WalletContractV1R3,
  type WalletContractV2R1,
  type WalletContractV2R2,
  type WalletContractV3R1,
  type WalletContractV3R2,
  type WalletContractV4,
  type WalletContractV5R1,
} from "@ton/ton";

type DerivationTypeToContract = {
  tonV1r1: typeof WalletContractV1R1;
  tonV1r2: typeof WalletContractV1R2;
  tonV1r3: typeof WalletContractV1R3;
  tonV2r1: typeof WalletContractV2R1;
  tonV2r2: typeof WalletContractV2R2;
  tonV3r1: typeof WalletContractV3R1;
  tonV3r2: typeof WalletContractV3R2;
  tonV4r1: typeof WalletContractV4;
  tonV5r1: typeof WalletContractV5R1;
};

export { type DerivationTypeToContract };
