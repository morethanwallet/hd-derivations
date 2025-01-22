import { type GetItemHandlerReturnType } from "./getItemHandler.type.js";

type AvaxHandlers = {
  avaxX: GetItemHandlerReturnType<"avaxX">;
  avaxP: GetItemHandlerReturnType<"avaxP">;
};

type BtcHandlers = {
  legacy: GetItemHandlerReturnType<"legacy">;
  segWit: GetItemHandlerReturnType<"segWit">;
  nativeSegWit: GetItemHandlerReturnType<"nativeSegWit">;
  taproot: GetItemHandlerReturnType<"taproot">;
  p2wsh: GetItemHandlerReturnType<"p2wsh">;
  p2wshInP2sh: GetItemHandlerReturnType<"p2wshInP2sh">;
};

type AdaHandlers = {
  enterprise: GetItemHandlerReturnType<"enterprise">;
  reward: GetItemHandlerReturnType<"reward">;
  adaBase: GetItemHandlerReturnType<"adaBase">;
};

type TonHandlers = { tonBase: GetItemHandlerReturnType<"tonBase"> };

type TrxHandlers = { trxBase: GetItemHandlerReturnType<"trxBase"> };

export type { AvaxHandlers, BtcHandlers, AdaHandlers, TonHandlers, TrxHandlers };
