import type { DerivationPath, DerivationTypeUnion } from "@/libs/types/index.js";
import { type DerivationHandlersCommonParameters } from "./derivationHandlersCommonParameters.type.js";

type LookupRangeParameters = {
  indexLookupFrom: number;
  indexLookupTo: number;
};

type LookupHandlersCommonParameters<TDerivationType extends DerivationTypeUnion> = {
  derivationPathPrefix: DerivationPath["derivationPath"];
} & LookupRangeParameters &
  DerivationHandlersCommonParameters<TDerivationType>;

export { type LookupHandlersCommonParameters };
