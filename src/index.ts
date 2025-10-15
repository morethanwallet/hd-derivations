export {
  getNetwork,
  DEFAULT_INSTANCE_PARAMETERS,
  type InstanceParameters,
  type NetworkTypeUnion,
  type DerivedItem,
  type GetDerivationConfig,
  type DerivationConfig,
  type GetNetworkTypeUnion,
} from "@/modules/network/index.js";
export type { DerivationTypeUnion, GetDerivationTypeUnion } from "@/libs/types/types.js";
export { Mnemonic } from "@/libs/modules/mnemonic/index.js";

// enkrypt -> btc -> use m/49'/0'/0'/0/0
// enkrypt -> doge -> use m/49'/0'/0'/0/0
// enkrypt -> ltc -> use m/49'/0'/0'/0/0
// enkrypt -> etc -> use m/44'/60'/0'/0/0
// exodus -> ltc -> legacy derivation
// enkrypt password - sdasd#$#D#D#

// mnemonic: deposit potato belt …  counter=1  addr=addr1qyzyyhdd43qgumfzpf0yc5qg8yfmrh94rtgf4aqxkxhv8tqygfw6mtzq3ekjyzj7f3gqswgnk8wt2xksnt6qdvdwcwkqklvquh
// mnemonic: drill exotic title f…  counter=3  addr=addr1qymnxusdlakesfm4kmef2ca4ryf5jukfrlvkrc8xzpktc2ehxdeqmlmdnqnhtdhjj43m2xgnf9evj87ev8swvyrvhs4shxt4jt
// mnemonic: volume lesson garage…  counter=2  addr=addr1q9pv40cm5k66qjva263462vt7lv6qx9hvjtg0p60uehqcp6ze2l3hfd45pye644rt55cha7e5qvtweyks7r5lenwpsrsuhnr45
