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

type ContractVersionToContract = {
  v1r1: typeof WalletContractV1R1;
  v1r2: typeof WalletContractV1R2;
  v1r3: typeof WalletContractV1R3;
  v2r1: typeof WalletContractV2R1;
  v2r2: typeof WalletContractV2R2;
  v3r1: typeof WalletContractV3R1;
  v3r2: typeof WalletContractV3R2;
  v4r1: typeof WalletContractV4;
  v5r1: typeof WalletContractV5R1;
};

export { type ContractVersionToContract };
