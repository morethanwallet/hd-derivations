import { type DerivationTypeUnion } from "@/types/index.js";
import { type DeriveItemFromMnemonic } from "./deriveItemFromMnemonic.type.js";
import { type GetCredentialFromPrivateKey } from "./getCredentialFromPrivateKey.type.js";
import { type DeriveItemsBatchFromMnemonic } from "./deriveItemsBatchFromMnemonic.type.js";

type AbstractNetwork<TDerivationType extends DerivationTypeUnion> = {
  deriveItemsBatchFromMnemonic: DeriveItemsBatchFromMnemonic<TDerivationType>;
  deriveItemFromMnemonic: DeriveItemFromMnemonic<TDerivationType>;
  getCredentialFromPrivateKey: GetCredentialFromPrivateKey<TDerivationType>;
};

export { type AbstractNetwork };
