import { type getAvaxItemHandlers } from "../helpers/index.js";

type Handlers = {
  avaxX: ReturnType<typeof getAvaxItemHandlers>;
  avaxP: ReturnType<typeof getAvaxItemHandlers>;
};

export { type Handlers };
