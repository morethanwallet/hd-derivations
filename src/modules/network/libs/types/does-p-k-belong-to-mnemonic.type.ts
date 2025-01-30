import type { DerivationTypeUnion, PrivateKey } from "@/libs/types/index.js";
import { type LookupHandlersCommonParameters } from "./lookup-handlers-common-parameters.type.js";
import type { ValueOf } from "ts-essentials";

type DoesPKBelongToMnemonicParameters<T extends DerivationTypeUnion> = {
  privateKey: ValueOf<PrivateKey<T>>;
} & LookupHandlersCommonParameters<T>;

type DoesPKBelongToMnemonic<T extends DerivationTypeUnion> = (
  parameters: DoesPKBelongToMnemonicParameters<T>,
) => boolean;

export { type DoesPKBelongToMnemonic, type DoesPKBelongToMnemonicParameters };
