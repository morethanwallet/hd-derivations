import { type DerivationTypeUnion } from "@/libs/types/types.js";
import { type GetDerivationHandlersReturnType } from "./get-derivation-handlers.type.js";

type DerivationsHandlers<T extends DerivationTypeUnion> = {
  [key in T]: GetDerivationHandlersReturnType<T>;
};

export { type DerivationsHandlers };
