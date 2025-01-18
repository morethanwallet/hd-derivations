import {
  type getBaseItemHandlers,
  type getEnterpriseItemHandlers,
  type getRewardItemHandlers,
} from "../helpers/index.js";

type Handlers = {
  enterprise: ReturnType<typeof getEnterpriseItemHandlers>;
  reward: ReturnType<typeof getRewardItemHandlers>;
  adaBase: ReturnType<typeof getBaseItemHandlers>;
};

export { type Handlers };
