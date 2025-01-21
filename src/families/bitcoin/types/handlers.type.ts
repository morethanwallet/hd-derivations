import { type GetItemHandlerReturnType } from "@/families/types/index.js";

type Handlers = {
  legacy: GetItemHandlerReturnType<"legacy">;
  segWit: GetItemHandlerReturnType<"segWit">;
  nativeSegWit: GetItemHandlerReturnType<"nativeSegWit">;
  taproot: GetItemHandlerReturnType<"taproot">;
  p2wsh: GetItemHandlerReturnType<"p2wsh">;
  p2wshInP2sh: GetItemHandlerReturnType<"p2wshInP2sh">;
};

export { type Handlers };
