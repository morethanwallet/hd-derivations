import { type DerivationTypeUnion } from "@/libs/types/index.js";
import { type GetDerivationHandlersReturnType } from "./getDerivationHandlers.type.js";

type NetworkHandlers<T extends DerivationTypeUnion> = {
  [key in T]: GetDerivationHandlersReturnType<T>;
};

export { type NetworkHandlers };
