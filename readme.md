# HD Derivation

## General info

This package is designed for generating cryptographic metadata for various blockchain networks. It provides users with the ability to derive addresses, private keys, and public keys for any supported network using a single mnemonic or private key. Additionally, it supports non-standard derivation methods, allowing for seamless migration from other clients.

## Features

- Multi-Network Support: Generate metadata for all implemented networks using a single mnemonic.

- Private Key Compatibility: Derive addresses and keys directly from a private key.

- Address Derivation Standards: Supports multiple standards, such as BIP44, BIP84, BIP86 and more.

- Flexible Migration: Allows users to migrate from non-standard derivation methods used by other clients.

## Folder Structure

`network`

This folder contains all the implemented blockchain networks. Each network is configured to interact with specific address derivation standards and rules.

`address`

The address folder implements the logic for different address derivation standards.

`mnemonic`

This folder is responsible for mnemonic related operations.

## Simple Start

1. `npm install` at the root
2. `npx simple-git-hooks` at the root
3. `npm run start` to execute a script
4. `npm run test` to run tests

### Usage

#### 1. Create a mnemonic instance

```js
import { Mnemonic } from "@/mnemonic/index.ts";
const mnemonic = new Mnemonic("...");
```

#### 2. Create a network instance

````js
const dogecoin = new Dogecoin(mnemonic, "mainnet");```
````

- Get data using a mnemonic:

```js
const data = dogecoin.derive("m/44'/144'/0'/0/0");
```

- Get data using a private key:

```js
dogecoin.importByPrivateKey(
  "m/44'/144'/0'/0/0",
  "QVyDqtJqgkVdohyfuVFQq8Tt9h46q6ib26xnabLMHAumT42JWA6Y"
);
```
