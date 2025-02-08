# HD Derivations

## General info

hd-derivations is a powerful and flexible hierarchical deterministic (HD) key derivation library designed for seamless multi-chain support. It allows users to derive private keys, public keys, and addresses from mnemonics or private keys, ensuring compatibility with various blockchain networks. The library is built to handle standard and non-standard derivation paths, making it ideal for restoring accounts from custom wallet setups.

With support for multiple key types and derivation schemes, `hd-derivations` is a reliable solution for developers working with Bitcoin, Ethereum-compatible chains, Cardano, and more. Whether you are generating wallets, recovering accounts, or working with advanced key management, this package simplifies the process while maintaining security and flexibility.

## Features

- Mnemonic-Based Derivation – Generate private keys, public keys, and addresses from a mnemonic phrase
- Private Key-Based Derivation – Derive public keys and addresses directly from a private key
- Batch Derivation – Derive multiple key sets from a mnemonic in a single operation
- Mnemonic Verification – Check if a private key was derived from a given mnemonic
- Custom Derivation Paths – Support non-standard derivation paths for wallet recovery and custom setups
- Multi-Network Compatibility – Works with Bitcoin, EVM chains (Ethereum, Binance Smart Chain, etc.), Cardano, and more
- Extensible & Secure – Designed for easy integration with different blockchain clients while maintaining strong security principles

## How to use

### 1. Install the package

```ts
npm install hd-derivations
```

### 2. Import utilities:

- Node JS:

```ts
import { getNetwork } from "hd-derivations/node";
```

- Browser:

```ts
import { getNetwork } from "hd-derivations/browser";
```

### 3. Get network instance by:

- Manually passing the required parameters:

```ts
const network = getNetwork({
  network: "bch",
  mnemonic: "drill exotic title fall ivory boy praise unfold search foil surge tip",
  derivationConfig: {
    derivationType: "bchCashAddr",
    networkPurpose: "mainnet",
    prefixConfig: {
      messagePrefix: "\x18Bitcoin Signed Message:\n",
      bech32: "bc",
      bip32: {
        public: 0x0488b21e,
        private: 0x0488ade4,
      },
      pubKeyHash: 0x00,
      scriptHash: 0x05,
      wif: 0x80,
    },
  },
});
```

- Using the default parameters:

```ts
import { DEFAULT_BCH_INSTANCE_PARAMETERS } from "hd-derivations/node"; // Or "hd-derivations/browser"

const network = getNetwork(DEFAULT_BCH_INSTANCE_PARAMETERS);
```

### 4. Use the instance methods:

#### Derive Item From Mnemonic

```ts
const item = network.deriveItemFromMnemonic({ derivationPath: "m/44'/145'/0'/0/0" });`
```

##### Output:

```ts
{
  privateKey: 'L5aNkaUVgbf9amcZaJxxkXBC6X9msHUGix6G1UiHS3seDADj3u7T',
  publicKey: '030c98a8878c769710d0a986e824659b56fdb11a22ff3e8b4c3061944932fc5bcd',
  address: 'bitcoincash:qpflutgnl6xg988yxaqv4y4jcef3x663gyejnjfxte',
  derivationPath: "m/44'/145'/0'/0/0"
}
```

#### Get Credential From PK

```ts
const credential = network.getCredentialFromPK({
  privateKey: "Kysn6FCsYUwSwYVdUD4c6kdntJeZCZWpPYPj6LjEV2pDPyWNFhjX",
});
```

##### Output:

```ts
{
  privateKey: 'Kysn6FCsYUwSwYVdUD4c6kdntJeZCZWpPYPj6LjEV2pDPyWNFhjX',
  publicKey: '0333d222cc1fd501e74b6d64cb1e4dd85bbcb28d9ce3fd6a30133f5aa6211a8fc3',
  address: 'bitcoincash:qrchjgvn4keqa6qwesjvywyj2fy46x2ex556xmy82u'
}
```

#### Derive Items Batch From Mnemonic

```ts
const items = network.deriveItemsBatchFromMnemonic({
  derivationPathPrefix: "m/44'/145'/0'/0",
  indexLookupFrom: 0,
  indexLookupTo: 2,
});
```

##### Output:

```ts
[
  {
    privateKey: "L5SA8xakaywY1Sham7js3Uj27kTP3voCghRZa8JdH5CuynwY89jM",
    publicKey: "02766182fa20d62a27560d36516753d708cc5a47ff67b40d1967f2ea655c97f37b",
    address: "bitcoincash:qpdlt7ra4edruc59yvkkqavgxuae2z73acv5p83mxh",
    derivationPath: "m/44'/145'/0'/0/0",
  },
  {
    privateKey: "L3dcBt5oH4Q5fLUgi3Sfr9S4dLVMGKSa42wkMqBeV7KECc4ThPJz",
    publicKey: "0263144016657a7fe9c08d10e55e7fe08648a17ced5d1aa7a7e1f94ad122993245",
    address: "bitcoincash:qq37wqs963g6dey6pkczd7g2jgpmrkmpmgcqp9knd5",
    derivationPath: "m/44'/145'/0'/0/1",
  },
]
```

#### Check If Private Key Belongs To Mnemonic

```ts
const doesPKBelongToMnemonic = network.doesPKBelongToMnemonic({
  privateKey: "KxUYbZfVLLEFehzKcNXJSJvmBjbYswf9ZEsasfH5vFbdvvwS1F31",
  derivationPathPrefix: "m/44'/145'/0'/0",
  indexLookupFrom: 0,
  indexLookupTo: 2,
});
```

##### Output:

```ts
false
```
