import { type KeyPair, type AddressData as CommonAddressData } from "@/address/index.js";
import { type AddressType } from "./index.js";
import { type ReturnTypeCompatibleAddressType } from "./addressType.type.js";

type BaseAddressData = Pick<CommonAddressData, "address" | "mnemonic"> & {
  enterprisePrivateKey: string;
  enterprisePublicKey: string;
  enterprisePath: string;
  rewardPrivateKey: string;
  rewardPublicKey: string;
  rewardPath: string;
};

type AddressData<C extends AddressType> = C extends ReturnTypeCompatibleAddressType
  ? CommonAddressData
  : BaseAddressData;

type GetData<C extends AddressType> = (derivationPath: string) => AddressData<C>;

type ImportByPrivateKey<C extends AddressType> = (
  derivationPath: string,
  privateKey: KeyPair["privateKey"],
  destinationTag?: number
) => AddressData<C>;

type AbstractAddress<C extends AddressType> = {
  getData: GetData<C>;
  importByPrivateKey: ImportByPrivateKey<C>;
};

export { type AbstractAddress, type AddressData };
