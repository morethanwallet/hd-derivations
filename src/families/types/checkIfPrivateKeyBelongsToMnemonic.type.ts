import { type DerivationTypeUnion } from "@/types/derivation/index.js";
import { type CommonKeyPair } from "@/types/keys/index.js";
import { type LookupHandlersCommonParameters } from "./lookupHandlersCommonParameters.type.js";

type CommonHandlersParameters<TDerivationType extends DerivationTypeUnion> = {
  privateKey: CommonKeyPair["privateKey"];
} & LookupHandlersCommonParameters<TDerivationType>;

type CheckIfPrivateKeyBelongsToMnemonicInnerHandlerParameters<
  TDerivationType extends DerivationTypeUnion
> = CommonHandlersParameters<TDerivationType>;

type CheckIfPrivateKeyBelongsToMnemonicInnerHandler<TDerivationType extends DerivationTypeUnion> = (
  parameters: CheckIfPrivateKeyBelongsToMnemonicInnerHandlerParameters<TDerivationType>
) => boolean;

type CheckIfPrivateKeyBelongsToMnemonicParameters<TDerivationType extends DerivationTypeUnion> =
  CommonHandlersParameters<TDerivationType>;

type CheckIfPrivateKeyBelongsToMnemonic<TDerivationType extends DerivationTypeUnion> = (
  parameters: CheckIfPrivateKeyBelongsToMnemonicParameters<TDerivationType>
) => boolean;

export {
  type CheckIfPrivateKeyBelongsToMnemonic,
  type CheckIfPrivateKeyBelongsToMnemonicParameters,
  type CheckIfPrivateKeyBelongsToMnemonicInnerHandler,
  type CheckIfPrivateKeyBelongsToMnemonicInnerHandlerParameters,
};
