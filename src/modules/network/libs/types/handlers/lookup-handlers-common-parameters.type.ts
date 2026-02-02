import { type HandlersCommonParameters } from "./handlers-common-parameters.type.js";

import type { DerivationTypeUnion } from "@/libs/types/types.js";

type LookupRangeParameters = {
  indexLookupFrom: number;
  indexLookupTo: number;
};

type LookupHandlersCommonParameters<T extends DerivationTypeUnion> = LookupRangeParameters &
  HandlersCommonParameters<T>;

export { type LookupHandlersCommonParameters };
