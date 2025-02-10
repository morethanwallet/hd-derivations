import type { DerivationTypeUnion, PrivateKey } from "@/libs/types/index.js";
import { type LookupHandlersCommonParameters } from "./lookup-handlers-common-parameters.type.js";
import type { ValueOf } from "@/libs/types/index.js";
import type { CommonDerivationPathPrefix } from "./derivation-path-prefix.type.js";

type DoesPKBelongToMnemonicParameters<T extends DerivationTypeUnion> = {
  privateKey: ValueOf<PrivateKey<T>>;
} & LookupHandlersCommonParameters<T> &
  CommonDerivationPathPrefix;

type DoesPKBelongToMnemonic<T extends DerivationTypeUnion> = (
  parameters: DoesPKBelongToMnemonicParameters<T>,
) => boolean;

export { type DoesPKBelongToMnemonic, type DoesPKBelongToMnemonicParameters };
