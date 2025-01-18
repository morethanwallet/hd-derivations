import {
  type getLegacyItemHandlers,
  type getNativeSegWitItemHandlers,
  type getP2wshInP2shItemHandlers,
  type getP2wshItemHandlers,
  type getSegWitItemHandlers,
  type getTaprootItemHandlers,
} from "../helpers/index.js";

type Handlers = {
  legacy: ReturnType<typeof getLegacyItemHandlers>;
  segWit: ReturnType<typeof getSegWitItemHandlers>;
  nativeSegWit: ReturnType<typeof getNativeSegWitItemHandlers>;
  taproot: ReturnType<typeof getTaprootItemHandlers>;
  p2wsh: ReturnType<typeof getP2wshItemHandlers>;
  p2wshInP2sh: ReturnType<typeof getP2wshInP2shItemHandlers>;
};

export { type Handlers };
