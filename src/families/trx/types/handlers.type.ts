import { type getTrxItemHandlers } from "../helpers/index.js";

type Handlers = { trxBase: ReturnType<typeof getTrxItemHandlers> };

export { type Handlers };
