import { type Address } from "@/address/types/index.js";
import { toUint8Array } from "@/helpers/index.js";
import { type CommonKeyPair } from "@/types/keys/index.js";
import { type KeysConfig } from "@/keys/types/index.js";
import { hash160 } from "bitcoinjs-lib/src/crypto";
import bs58check from "bs58check";

const HEXADECIMAL_SYSTEM_IDENTIFIER = 16;

function splitPrefixIntoBytesArray(prefix: number): Uint8Array {
  const firstByteStartIndex = 0;
  const secondByteStartIndex = 2;
  const stringifiedPrefix = prefix.toString(HEXADECIMAL_SYSTEM_IDENTIFIER);

  const firstByte = Number.parseInt(
    stringifiedPrefix.slice(firstByteStartIndex, secondByteStartIndex),
    HEXADECIMAL_SYSTEM_IDENTIFIER
  );

  const secondByte = Number.parseInt(
    stringifiedPrefix.slice(secondByteStartIndex),
    HEXADECIMAL_SYSTEM_IDENTIFIER
  );

  return toUint8Array(Buffer.from([firstByte, secondByte]));
}

function getTransparentAddress(
  publicKey: CommonKeyPair["publicKey"],
  keysConfig: KeysConfig
): Address["address"] {
  const ripemd160 = hash160(toUint8Array(Buffer.from(publicKey, "hex")));
  const prefix = splitPrefixIntoBytesArray(keysConfig.pubKeyHash);
  const addressBytes = toUint8Array(Buffer.concat([prefix, ripemd160]));

  return bs58check.encode(addressBytes);
}

export { getTransparentAddress };
