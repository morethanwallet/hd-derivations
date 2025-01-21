import { type GetItemHandlerReturnType } from "@/families/types/index.js";

type Handlers = {
  enterprise: GetItemHandlerReturnType<"enterprise">;
  reward: GetItemHandlerReturnType<"reward">;
  adaBase: GetItemHandlerReturnType<"adaBase">;
};

export { type Handlers };
