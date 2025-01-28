import type { DerivationTypeUnion, CommonPrivateKey } from "@/libs/types/index.js";
import { type LookupHandlersCommonParameters } from "./lookup-handlers-common-parameters.type.js";

type CommonHandlersParameters<TDerivationType extends DerivationTypeUnion> = CommonPrivateKey &
  LookupHandlersCommonParameters<TDerivationType>;

type DoesPKBelongToMnemonicInnerHandlerParameters<TDerivationType extends DerivationTypeUnion> =
  CommonHandlersParameters<TDerivationType>;

type DoesPKBelongToMnemonicInnerHandler<TDerivationType extends DerivationTypeUnion> = (
  parameters: DoesPKBelongToMnemonicInnerHandlerParameters<TDerivationType>,
) => boolean;

type DoesPKBelongToMnemonicParameters<TDerivationType extends DerivationTypeUnion> =
  CommonHandlersParameters<TDerivationType>;

type DoesPKBelongToMnemonic<TDerivationType extends DerivationTypeUnion> = (
  parameters: DoesPKBelongToMnemonicParameters<TDerivationType>,
) => boolean;

export {
  type DoesPKBelongToMnemonic,
  type DoesPKBelongToMnemonicParameters,
  type DoesPKBelongToMnemonicInnerHandler,
  type DoesPKBelongToMnemonicInnerHandlerParameters,
};
