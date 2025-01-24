import { type DerivationTypeUnion } from "@/libs/types/index.js";
import { type GetItemHandlerReturnType } from "./getItemHandler.type.js";

type NetworkHandlers<T extends DerivationTypeUnion> = {
  [key in T]: GetItemHandlerReturnType<T>;
};

export { type NetworkHandlers };
