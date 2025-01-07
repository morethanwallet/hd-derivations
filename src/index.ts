import { Mnemonic } from "@/mnemonic/index.js";
import { Avax } from "@/network/index.js";

export {
  Avax,
  Bitcoin,
  BitcoinCash,
  BitcoinCore,
  Bnb,
  Dogecoin,
  Evm,
  MultiBitHd,
  Solana,
  Xrp,
  Zcash,
} from "@/network/index.js";
export { Mnemonic } from "@/mnemonic/index.js";
const mnemonic = new Mnemonic(
  "erase valley flower sugar easily title farm notice belt sibling cactus dry lion gospel remember"
);
const AvaxNetwork = new Avax(mnemonic, "mainnet");
console.log(AvaxNetwork.getAddressData("m/45'/9000'/0'/0/0", "X"));
