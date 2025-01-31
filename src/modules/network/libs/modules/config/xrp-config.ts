import type { PrefixConfigProperty } from "@/libs/modules/keys/index.js";
import { getCommonPrefixConfig } from "./libs/helpers/index.js";

type XrpConfig = {
  derivationPathPrefix: string;
} & PrefixConfigProperty;

const xrpConfig: XrpConfig = {
  ...getCommonPrefixConfig("mainnet"),
  derivationPathPrefix: "m/44'/144'",
};

export { xrpConfig };
