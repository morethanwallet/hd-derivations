// import base58 from "bs58";
// import { Keypair } from "@solana/web3.js";
// import { type Mnemonic } from "@/mnemonic/index.js";
// import { Keys } from "@/keys/solana/index.js";
// import {
//   DerivedCredential,
//   DerivedItem,
//   DerivedKeyPair,
//   DeriveFromMnemonicParameters,
//   ImportByPrivateKeyParameters,
//   type AbstractKeyDerivation,
// } from "../types/index.js";
// import { type DerivationType } from "../enums/index.js";

// class SolanaKeyDerivation extends Keys implements AbstractKeyDerivation<typeof DerivationType.SOL> {
//   public constructor(mnemonic: Mnemonic) {
//     super(mnemonic);
//   }

//   public deriveFromMnemonic({
//     derivationPath,
//   }: DeriveFromMnemonicParameters<typeof DerivationType.SOL>): DerivedItem<
//     typeof DerivationType.SOL
//   > {
//     const { privateKey, publicKey } = this.getKeyPair(derivationPath);

//     return {
//       privateKey,
//       publicKey,
//       derivationPath,
//       address: publicKey,
//     };
//   }

//   public importByPrivateKey({
//     privateKey,
//   }: ImportByPrivateKeyParameters<typeof DerivationType.SOL>): DerivedCredential<
//     typeof DerivationType.SOL
//   > {
//     // for (let i = 0; i < SEARCH_FROM_MNEMONIC_LIMIT; i++) {
//     //   const incrementedDerivationPath = appendAddressToDerivationPath(derivationPath, i);
//     //   const data = this.derive(incrementedDerivationPath);

//     //   if (data.privateKey === privateKey) return data;
//     // }

//     const keyPair = Keypair.fromSecretKey(base58.decode(privateKey));
//     const publicKey = this.getPublicKey(keyPair);

//     return {
//       privateKey,
//       publicKey,
//       address: publicKey,
//     };
//   }

//   private getKeyPair(derivationPath: string): DerivedKeyPair {
//     const rootKey = this.getRootKey();
//     const keyPair = Keypair.fromSeed(rootKey.derive(derivationPath).privateKey);
//     const publicKey = this.getPublicKey(keyPair);
//     const privateKey = base58.encode(keyPair.secretKey);

//     return { privateKey, publicKey };
//   }

//   private getPublicKey(keyPair: Keypair): string {
//     return keyPair.publicKey.toBase58();
//   }
// }

// export { SolanaKeyDerivation };
