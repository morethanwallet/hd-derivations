import { type DerivationTypeUnion } from "@/libs/types/index.js";
import { type DeriveItemFromMnemonic } from "./derive-item-from-mnemonic.type.js";
import { type GetCredentialFromPrivateKey } from "./get-credential-from-private-key.type.js";
import { type DeriveItemsBatchFromMnemonic } from "./derive-items-batch-from-mnemonic.type.js";
import { type CheckIfPrivateKeyBelongsToMnemonic } from "./check-if-private-key-belongs-to-mnemonic.type.js";

type AbstractNetwork<TDerivationType extends DerivationTypeUnion> = {
  deriveItemFromMnemonic: DeriveItemFromMnemonic<TDerivationType>;
  getCredentialFromPrivateKey: GetCredentialFromPrivateKey<TDerivationType>;
  deriveItemsBatchFromMnemonic: DeriveItemsBatchFromMnemonic<TDerivationType>;
  checkIfPrivateKeyBelongsToMnemonic: CheckIfPrivateKeyBelongsToMnemonic<TDerivationType>;
};

export { type AbstractNetwork };
