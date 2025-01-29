import { type Btc } from "@/modules/network/btc/index.js";
import { type Ada } from "@/modules/network/ada/index.js";
import { type Avax } from "@/modules/network/avax/index.js";
import { type Trx } from "@/modules/network/trx/index.js";
import { type Ton } from "@/modules/network/ton/index.js";
import { type Sui } from "@/modules/network/sui/index.js";

type NetworkNameToNetwork = {
  btc: Btc;
  ada: Ada;
  avax: Avax;
  trx: Trx;
  ton: Ton;
  sui: Sui;
};

export type { NetworkNameToNetwork };
