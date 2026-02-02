import { type GetDerivationHandlersReturnType } from "./get-derivation-handlers.type.js";

import { type DerivationTypeUnion } from "@/libs/types/types.js";

type DerivationsHandlers<T extends DerivationTypeUnion> = {
  [key in T]: GetDerivationHandlersReturnType<T>;
};

export { type DerivationsHandlers };
