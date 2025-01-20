// import { type BIP32Interface } from "bip32";
// import {
//   type AbstractAddress,
//   type AddressMetadata,
//   type Keys,
//   type NetworkConfig,
// } from "@/families/index.js";
// import { toUint8Array } from "@/helpers/index.js";
// import blake2b from "blake2b";

// TODO: Finish the class later

// function prfExpand(masterSpendingKey: Uint8Array, separator: number[]): Uint8Array {
//   return blake2b(64, undefined, undefined, toUint8Array(Buffer.from("Zcash_ExpandSeed")))
//     .update(toUint8Array(Buffer.concat([masterSpendingKey, toUint8Array(separator)])))
//     .digest("binary");
// }

// function leos2ip512(littleEndian: Uint8Array) {
//   let result = BigInt(0);

//   for (let i = 0; i < littleEndian.length; i++) {
//     result += BigInt(littleEndian[i] ?? 0) << BigInt(8 * i);
//   }

//   return result;
// }

// class ZcashShieldedAddress extends Bip32Keys implements AbstractAddress {
//   public constructor(networkConfig: NetworkConfig, mnemonic?: string) {
//     super(networkConfig, mnemonic);
//   }

//   public getAddressMetadata(addressIndex: number): AddressMetadata {
//     const I = blake2b(64, undefined, undefined, toUint8Array(Buffer.from("ZcashIP32Sapling")))
//       .update(toUint8Array(this.getSeed()))
//       .digest("binary");

//     const masterSpendingKey = I.slice(0, 32);
//     const masterChainCode = I.slice(32);

//     console.log(leos2ip512(prfExpand(masterSpendingKey, [0x00])));

//     return {
//       privateKey: "",
//       publicKey: "",
//       address: "",
//       path: `${this.networkConfig.derivationPath}/${addressIndex}`,
//       mnemonic: this.mnemonic,
//     };
//   }

//   // private generateAddress(node: BIP32Interface): string | undefined {
//   //   const rawPublicKey = toUint8Array(this.generatePublicKeyBuffer(node));
//   //   const ripemd160 = hash160(rawPublicKey);
//   //   const prefix = splitPrefixIntoBytesArray(this.networkConfig.keysConfig.pubKeyHash);
//   //   const addressBytes = toUint8Array(Buffer.concat([prefix, ripemd160]));

//   //   return bs58check.encode(addressBytes);
//   // }

//   private generateKeys(node: BIP32Interface): Keys {
//     const hasPrivateKey = !node.isNeutered();
//     const privateKey = hasPrivateKey ? node.toWIF() : "NA";
//     const rawPublicKey = this.generatePublicKeyBuffer(node);
//     const publicKey = rawPublicKey.toString("hex");

//     return { privateKey, publicKey };
//   }

//   private generatePublicKeyBuffer(node: BIP32Interface): Buffer {
//     return Buffer.from(node.publicKey);
//   }
// }

// export { ZcashShieldedAddress };
