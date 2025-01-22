import { type Address } from "@/address/types/index.js";
import { type CommonKeyPair } from "@/types/keys/index.js";
import { type WorkChain, type DerivationTypeToContract } from "./types/index.js";
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
import { type TonDerivationTypeUnion } from "@/types/derivation/index.js";

type GetTonAddressParameters = {
  publicKey: CommonKeyPair["publicKey"];
  workChain: WorkChain;
  derivationType: TonDerivationTypeUnion;
  isFriendlyFormat: boolean;
  friendlyFormatArguments?: {
    urlSafe?: boolean;
    bounceable?: boolean;
    testOnly?: boolean;
  };
};

const derivationTypeToContract: DerivationTypeToContract = {
  tonV1r1: WalletContractV1R1,
  tonV1r2: WalletContractV1R2,
  tonV1r3: WalletContractV1R3,
  tonV2r1: WalletContractV2R1,
  tonV2r2: WalletContractV2R2,
  tonV3r1: WalletContractV3R1,
  tonV3r2: WalletContractV3R2,
  tonV4r1: WalletContractV4,
  tonV5r1: WalletContractV5R1,
};

function getTonAddress({
  publicKey,
  workChain,
  derivationType,
  isFriendlyFormat,
  friendlyFormatArguments = {
    urlSafe: true,
    bounceable: false,
    testOnly: false,
  },
}: GetTonAddressParameters): Address["address"] {
  const publicKeyBuffer = Buffer.from(publicKey, "hex");
  const contract = derivationTypeToContract[derivationType];

  const contractInstance = contract.create({
    publicKey: publicKeyBuffer,
    workchain: workChain,
  });

  return isFriendlyFormat
    ? contractInstance.address.toString(friendlyFormatArguments)
    : contractInstance.address.toRawString();
}

export { getTonAddress };
