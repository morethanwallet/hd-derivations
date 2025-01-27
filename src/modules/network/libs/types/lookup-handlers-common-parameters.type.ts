import type { DerivationPath, DerivationTypeUnion } from "@/libs/types/index.js";
import { type CommonHandlersParameters } from "./common-handlers-parameters.type.js";

type LookupRangeParameters = {
  indexLookupFrom: number;
  indexLookupTo: number;
};

type LookupHandlersCommonParameters<TDerivationType extends DerivationTypeUnion> = {
  derivationPathPrefix: DerivationPath["derivationPath"];
} & LookupRangeParameters &
  CommonHandlersParameters<TDerivationType>;

export { type LookupHandlersCommonParameters };
