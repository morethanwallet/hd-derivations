import { type KeyPair, type AddressData as CommonAddressData } from "@/address/index.js";
import { type AddressType, type BaseAddressKeyPair } from "./index.js";
import { type ReturnTypeCompatibleAddressType } from "./addressType.type.js";

type BaseAddressData = Pick<CommonAddressData, "address" | "mnemonic"> & {
  enterprisePath: string;
  rewardPath: string;
} & BaseAddressKeyPair;

type AddressData<C extends AddressType> = C extends ReturnTypeCompatibleAddressType
  ? CommonAddressData
  : BaseAddressData;

type GetData<C extends AddressType> = (derivationPath: string) => AddressData<C>;

type ImportByPrivateKey<C extends AddressType> = C extends ReturnTypeCompatibleAddressType
  ? (derivationPath: string, privateKey: KeyPair["privateKey"]) => AddressData<C>
  : (
      derivationPath: string,
      enterprisePrivateKey: BaseAddressKeyPair["enterprisePrivateKey"],
      rewardPrivateKey: BaseAddressKeyPair["rewardPrivateKey"]
    ) => AddressData<C>;

type AbstractAddress<C extends AddressType> = {
  getData: GetData<C>;
  importByPrivateKey: ImportByPrivateKey<C>;
};

export { type AbstractAddress, type AddressData };
