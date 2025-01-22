import { type Address } from "@/address/types/index.js";
import { type CommonKeyPair } from "@/types/keys/index.js";
import { type WorkChain, type ContractVersionToContract } from "./types/index.js";
import {
  WalletContractV1R1,
  WalletContractV1R2,
  WalletContractV1R3,
  WalletContractV2R1,
  WalletContractV2R2,
  WalletContractV3R1,
  WalletContractV3R2,
  WalletContractV4,
  WalletContractV5R1,
} from "@ton/ton";

type GetTonAddressParameters = {
  publicKey: CommonKeyPair["publicKey"];
  workChain: WorkChain;
  contractVersion: keyof ContractVersionToContract;
  isFriendlyFormat: boolean;
  friendlyFormatArguments?: {
    urlSafe?: boolean;
    bounceable?: boolean;
    testOnly?: boolean;
  };
};

const contractVersionToContract: ContractVersionToContract = {
  v1r1: WalletContractV1R1,
  v1r2: WalletContractV1R2,
  v1r3: WalletContractV1R3,
  v2r1: WalletContractV2R1,
  v2r2: WalletContractV2R2,
  v3r1: WalletContractV3R1,
  v3r2: WalletContractV3R2,
  v4r1: WalletContractV4,
  v5r1: WalletContractV5R1,
};

function getTonAddress({
  publicKey,
  workChain,
  contractVersion,
  isFriendlyFormat,
  friendlyFormatArguments = {
    urlSafe: true,
    bounceable: false,
    testOnly: false,
  },
}: GetTonAddressParameters): Address["address"] {
  const publicKeyBuffer = Buffer.from(publicKey, "hex");
  const contract = contractVersionToContract[contractVersion];

  const contractInstance = contract.create({
    publicKey: publicKeyBuffer,
    workchain: workChain,
  });

  return isFriendlyFormat
    ? contractInstance.address.toString(friendlyFormatArguments)
    : contractInstance.address.toRawString();
}

export { getTonAddress };
