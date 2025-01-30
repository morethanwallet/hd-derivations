import { type Btc } from "@/modules/network/btc/index.js";
import { type Ada } from "@/modules/network/ada/index.js";
import { type Avax } from "@/modules/network/avax/index.js";
import { type Trx } from "@/modules/network/trx/index.js";
import { type Ton } from "@/modules/network/ton/index.js";
import { type Sui } from "@/modules/network/sui/index.js";
import { type Bch } from "@/modules/network/bch/index.js";

type NetworkNameToNetwork = {
  btc: Btc;
  ada: Ada;
  avax: Avax;
  trx: Trx;
  ton: Ton;
  sui: Sui;
  bch: Bch;
};

export type { NetworkNameToNetwork };
