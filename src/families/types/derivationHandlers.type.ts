import { type DerivationTypeUnion } from "@/types/derivation/index.js";
import { type GetItemHandlerReturnType } from "./getItemHandler.type.js";

type DerivationHandlers<T extends DerivationTypeUnion> = {
  [key in T]: GetItemHandlerReturnType<T>;
};

export { type DerivationHandlers };
