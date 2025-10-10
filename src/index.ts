import { DEFAULT_INSTANCE_PARAMETERS } from "@/modules/network/index.js";
import { getNetwork } from "./modules/network/get-network";

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
export type { DerivationTypeUnion, GetDerivationTypeUnion } from "@/libs/types/index.js";
export { Mnemonic } from "@/libs/modules/mnemonic/index.js";

const network = getNetwork({
  ...DEFAULT_INSTANCE_PARAMETERS.ada,
  mnemonic: "deposit potato belt enroll space involve sing angry marine shop ostrich midnight",
});
console.log(
  network.deriveItemFromMnemonic({
    // derivationPath: "m/44'/1815'/0'/0/0",
    enterpriseDerivationPath: "m/44'/1815'/0'/0/0",
    rewardDerivationPath: "m/44'/1815'/0'/0/0",
  }),
);

// enkrypt -> btc -> use m/49'/0'/0'/0/0
// enkrypt -> doge -> use m/49'/0'/0'/0/0
// enkrypt -> ltc -> use m/49'/0'/0'/0/0
// enkrypt -> etc -> use m/44'/60'/0'/0/0
// exodus -> sol -> #1 below
// exodus -> ada -> #2 below
// exodus -> ltc -> legacy derivation
// enkrypt password - sdasd#$#D#D#

// #1 Exodus Solana
// import { getPublicKey } from "ed25519-hd-key";
// import { Bip32Keys } from "./libs/modules/keys";
// import { Mnemonic } from "./libs/modules/mnemonic/mnemonic";
// import base58 from "bs58";
// const keys = new Bip32Keys(
//   undefined as any,
//   new Mnemonic("deposit potato belt enroll space involve sing angry marine shop ostrich midnight"),
// );
// const rootKey = keys.getBip32RootKeyFromSeed();
// export async function exodusSolanaKeypair() {
//   const node = rootKey.derivePath("m/44'/501'/0'/0/0");
//   const rawPriv = node.privateKey as Uint8Array;
//   const rawPrivateKey = rawPriv.slice(0, 32);

//   const rawPublicKey = getPublicKey(Buffer.from(rawPrivateKey), false);
//   const privateKey = base58.encode(Buffer.concat([rawPrivateKey, rawPublicKey]));
//   const publicKey = base58.encode(rawPublicKey);
//   console.log(publicKey);
// }

// exodusSolanaKeypair();

// #2 Exodus Cardano
// import { createHmac } from "crypto";
// import * as CSL from "@emurgo/cardano-serialization-lib-nodejs";
// import { Bip32Keys } from "./libs/modules/keys";
// import { Mnemonic } from "./libs/modules/mnemonic/mnemonic";
// // 1) secp256k1 BIP32: m/44'/1815'/0'/0/0
// async function deriveCardanoBip32Priv(mnemonic: string) {
//   const keys = new Bip32Keys(undefined as any, new Mnemonic(mnemonic));
//   const rootKey = keys.getBip32RootKeyFromSeed();
//   const path = `m/44'/1815'/0'/0/0`;
//   const child = rootKey.derivePath(path);
//   if (!child.privateKey) throw new Error("No private key at path");
//   return child.privateKey; // 32 bytes
// }

// // 2) Byron-legacy master key seed (bip_utils: HMAC_MESSAGE_FORMAT = "Root Seed Chain %d")
// function byronLegacyMasterFromSeed(seed32: Uint8Array, counter = 1) {
//   // HMAC-SHA512 with KEY = seed32, MESSAGE = "Root Seed Chain <counter>"
//   const msg = Buffer.from(`Root Seed Chain ${counter}`, "ascii");
//   const I = createHmac("sha512", seed32).update(msg).digest(); // 64B
//   const IL = I.subarray(0, 32); // private key bytes
//   const IR = I.subarray(32, 64); // chain code (not used below but available)
//   return { IL, IR };
// }

// // 3) Build a Shelley Base address using the same key for payment & stake (Exodus-style “strange”)
// function baseAddrFromSameKey(IL: Buffer, networkId = CSL.NetworkInfo.mainnet().network_id()) {
//   const sk = CSL.PrivateKey.from_normal_bytes(IL); // 32B ed25519 seed
//   const pk = sk.to_public();

//   const paymentCred = CSL.Credential.from_keyhash(pk.hash());
//   const stakeCred = CSL.Credential.from_keyhash(pk.hash());
//   const base = CSL.BaseAddress.new(networkId, paymentCred, stakeCred);
//   return { addressBech32: base.to_address().to_bech32(), sk, pk };
// }

// const mnemonic = "deposit potato belt enroll space involve sing angry marine shop ostrich midnight";

// // secp256k1 (BIP32/SLIP-10 compatible) → priv32 at m/44'/1815'/0'/0/0
// const cardanoBip32Priv32 = await deriveCardanoBip32Priv(mnemonic);

// // Byron-legacy master generator per bip_utils spec
// const { IL } = byronLegacyMasterFromSeed(cardanoBip32Priv32, 1);

// // Shelley base address with same key for payment & stake
// const { addressBech32 } = baseAddrFromSameKey(IL, CSL.NetworkInfo.mainnet().network_id());

// console.log("Strange Derivation:", addressBech32);
