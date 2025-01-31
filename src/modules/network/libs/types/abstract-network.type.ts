import { type DerivationTypeUnion } from "@/libs/types/index.js";
import { type DeriveItemFromMnemonic } from "./derive-item-from-mnemonic.type.js";
import { type GetCredentialFromPK } from "./get-credential-from-p-k.type.js";
import { type DeriveItemsBatchFromMnemonic } from "./derive-items-batch-from-mnemonic.type.js";
import { type DoesPKBelongToMnemonic } from "./does-p-k-belong-to-mnemonic.type.js";

type AbstractNetwork<T extends DerivationTypeUnion> = {
  deriveItemFromMnemonic: DeriveItemFromMnemonic<T>;
  getCredentialFromPK: GetCredentialFromPK<T>;
  deriveItemsBatchFromMnemonic: DeriveItemsBatchFromMnemonic<T>;
  doesPKBelongToMnemonic: DoesPKBelongToMnemonic<T>;
};

export { type AbstractNetwork };
