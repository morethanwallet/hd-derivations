// import { type Mnemonic } from "@/mnemonic/index.js";
// import {
//   DerivedCredential,
//   DerivedItem,
//   DerivedKeyPair,
//   DeriveItemFromMnemonicParameters,
//   GetCredentialFromPKParameters,
//   type AbstractNetwork,
// } from "@/families/types/index.js";
// import { Keys } from "@/keys/solana/index.js";
// import base58 from "bs58";
// import { Keypair } from "@solana/web3.js";

// class Solana extends Keys implements AbstractNetwork<"sol"> {
//   public constructor(mnemonic: Mnemonic) {
//     super(mnemonic);
//   }

//   public deriveItemFromMnemonic({
//     derivationPath,
//   }: DeriveItemFromMnemonicParameters<"sol">): DerivedItem<"sol"> {
//     const { privateKey, publicKey } = this.getKeyPair(derivationPath);

//     return {
//       privateKey,
//       publicKey,
//       derivationPath,
//       address: publicKey,
//     };
//   }

//   public getCredentialFromPK({
//     privateKey,
//   }: GetCredentialFromPKParameters<"sol">): DerivedCredential<"sol"> {
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

// export { Solana };
