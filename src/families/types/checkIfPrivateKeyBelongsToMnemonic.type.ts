import { type DerivationTypeUnion } from "@/types/index.js";
import {
  type DeriveItemsBatchFromMnemonicParameters,
  type DeriveItemsBatchFromMnemonicInnerHandlerParameters,
} from "./deriveItemsBatchFromMnemonic.type.js";
import { type CommonKeyPair } from "@/keyDerivation/types/index.js";

type CommonHandlersParameters = { privateKey: CommonKeyPair["privateKey"] };

type CheckIfPrivateKeyBelongsToMnemonicInnerHandlerParameters<
  TDerivationType extends DerivationTypeUnion
> = DeriveItemsBatchFromMnemonicInnerHandlerParameters<TDerivationType> & CommonHandlersParameters;

type CheckIfPrivateKeyBelongsToMnemonicParameters<TDerivationType extends DerivationTypeUnion> =
  DeriveItemsBatchFromMnemonicParameters<TDerivationType> & CommonHandlersParameters;

type CheckIfPrivateKeyBelongsToMnemonic<TDerivationType extends DerivationTypeUnion> = (
  parameters: CheckIfPrivateKeyBelongsToMnemonicParameters<TDerivationType>
) => boolean;

export {
  type CheckIfPrivateKeyBelongsToMnemonic,
  type CheckIfPrivateKeyBelongsToMnemonicParameters,
  type CheckIfPrivateKeyBelongsToMnemonicInnerHandlerParameters,
};
