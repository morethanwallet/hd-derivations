import { type ValueOf } from "@/types/index.js";
import { type DerivationPath } from "@/enums/index.js";
import { type AbstractAddress } from "@/address/index.js";
import { type AddressMetadata } from "@/address/types/index.js";

function searchFromMnemonic<T extends ValueOf<typeof DerivationPath>>(
  privateKey: string,
  getAddressMetadata: AbstractAddress<T>["getAddressMetadata"]
): AddressMetadata<T> | null {
  const searchFromMnemonicLimit = 20;

  for (let i = 0; i < searchFromMnemonicLimit; i++) {
    const addressMetadata = getAddressMetadata(i);

    if (addressMetadata.privateKey === privateKey) return addressMetadata;
  }

  return null;
}

export { searchFromMnemonic };
