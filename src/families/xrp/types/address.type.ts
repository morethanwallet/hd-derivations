import { type DerivationType } from "@/keyDerivation/enums/index.js";

type AddressUnion = typeof DerivationType.XRP_BASE | typeof DerivationType.XRP_X;

export { type AddressUnion };
