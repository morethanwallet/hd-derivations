import type { DerivationTypeUnion } from "@/libs/types/index.js";
import { type HandlersCommonParameters } from "./handlers-common-parameters.type.js";

type LookupRangeParameters = {
  indexLookupFrom: number;
  indexLookupTo: number;
};

type LookupHandlersCommonParameters<T extends DerivationTypeUnion> = LookupRangeParameters &
  HandlersCommonParameters<T>;

export { type LookupHandlersCommonParameters };
