import { type DerivationTypeUnion } from "@/libs/types/index.js";
import { type GetItemHandlerReturnType } from "./getItemHandler.type.js";

type DerivationHandlers<T extends DerivationTypeUnion> = {
  [key in T]: GetItemHandlerReturnType<T>;
};

export { type DerivationHandlers };
