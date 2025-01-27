export { NetworkFacade } from "./networkFacade/index.js";
export {
  DEFAULT_ADA_INSTANCE_PARAMETERS,
  DEFAULT_AVAX_INSTANCE_PARAMETERS,
  DEFAULT_BTC_INSTANCE_PARAMETERS,
  DEFAULT_TON_INSTANCE_PARAMETERS,
  DEFAULT_TRX_INSTANCE_PARAMETERS,
  DEFAULT_SUI_INSTANCE_PARAMETERS,
} from "./libs/constants/index.js";


// question: what's the diff between paths 
// ./modules/address/networks/..
// ./modules/network/..

// summary:
// move modules/address and modules/keyDerivation to libs 