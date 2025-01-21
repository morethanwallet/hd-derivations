import { type DerivationTypeUnion } from "@/types/derivation/index.js";
import { type DeriveItemFromMnemonic } from "./deriveItemFromMnemonic.type.js";
import { type GetCredentialFromPrivateKey } from "./getCredentialFromPrivateKey.type.js";
import { type DeriveItemsBatchFromMnemonic } from "./deriveItemsBatchFromMnemonic.type.js";
import { type CheckIfPrivateKeyBelongsToMnemonic } from "./checkIfPrivateKeyBelongsToMnemonic.type.js";

type AbstractNetwork<TDerivationType extends DerivationTypeUnion> = {
  deriveItemFromMnemonic: DeriveItemFromMnemonic<TDerivationType>;
  getCredentialFromPrivateKey: GetCredentialFromPrivateKey<TDerivationType>;
  deriveItemsBatchFromMnemonic: DeriveItemsBatchFromMnemonic<TDerivationType>;
  checkIfPrivateKeyBelongsToMnemonic: CheckIfPrivateKeyBelongsToMnemonic<TDerivationType>;
};

export { type AbstractNetwork };
