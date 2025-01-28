import { type DerivationTypeUnion } from "@/libs/types/index.js";
import { type DeriveItemFromMnemonic } from "./derive-item-from-mnemonic.type.js";
import { type GetCredentialFromPK } from "./get-credential-from-p-k.type.js";
import { type DeriveItemsBatchFromMnemonic } from "./derive-items-batch-from-mnemonic.type.js";
import { type DoesPKBelongToMnemonic } from "./does-p-k-belong-to-mnemonic.type.js";

type AbstractNetwork<TDerivationType extends DerivationTypeUnion> = {
  deriveItemFromMnemonic: DeriveItemFromMnemonic<TDerivationType>;
  getCredentialFromPK: GetCredentialFromPK<TDerivationType>;
  deriveItemsBatchFromMnemonic: DeriveItemsBatchFromMnemonic<TDerivationType>;
  doesPKeyBelongToMnemonic: DoesPKBelongToMnemonic<TDerivationType>;
};

export { type AbstractNetwork };
