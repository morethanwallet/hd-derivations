import { Mnemonic } from "./mnemonic/index.js";
import { Cardano } from "./network/cardano/cardano.network.js";

const mnemonic = new Mnemonic(
  "hello burst extend story smart remove color give ethics conduct eye knock"
);
console.log(new Cardano(mnemonic).getAddressData("base", ""));
