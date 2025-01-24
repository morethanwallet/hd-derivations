import type { DerivationTypeUnion, CommonPrivateKey } from "@/libs/types/index.js";
import { type LookupHandlersCommonParameters } from "./lookupHandlersCommonParameters.type.js";

type CommonHandlersParameters<TDerivationType extends DerivationTypeUnion> = CommonPrivateKey &
  LookupHandlersCommonParameters<TDerivationType>;

type CheckIfPrivateKeyBelongsToMnemonicInnerHandlerParameters<
  TDerivationType extends DerivationTypeUnion,
> = CommonHandlersParameters<TDerivationType>;

type CheckIfPrivateKeyBelongsToMnemonicInnerHandler<TDerivationType extends DerivationTypeUnion> = (
  parameters: CheckIfPrivateKeyBelongsToMnemonicInnerHandlerParameters<TDerivationType>,
) => boolean;

type CheckIfPrivateKeyBelongsToMnemonicParameters<TDerivationType extends DerivationTypeUnion> =
  CommonHandlersParameters<TDerivationType>;

type CheckIfPrivateKeyBelongsToMnemonic<TDerivationType extends DerivationTypeUnion> = (
  parameters: CheckIfPrivateKeyBelongsToMnemonicParameters<TDerivationType>,
) => boolean;

export {
  type CheckIfPrivateKeyBelongsToMnemonic,
  type CheckIfPrivateKeyBelongsToMnemonicParameters,
  type CheckIfPrivateKeyBelongsToMnemonicInnerHandler,
  type CheckIfPrivateKeyBelongsToMnemonicInnerHandlerParameters,
};
