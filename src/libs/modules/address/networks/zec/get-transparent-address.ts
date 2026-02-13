import { ripemd160 } from "@noble/hashes/legacy.js";
import { sha256 } from "@noble/hashes/sha2.js";
import bs58check from "bs58check";

import { type Address } from "@/libs/modules/address/libs/types/index.js";
import { type CommonKeyPair } from "@/libs/types/types.js";
import { type PrefixConfig } from "@/libs/modules/curves/curves.js";
import { convertHexToBytes } from "@/libs/utils/utils.js";

const HEXADECIMAL_SYSTEM_IDENTIFIER = 16;

function splitPrefixIntoBytesArray(prefix: number): Uint8Array {
  const firstByteStartIndex = 0;
  const secondByteStartIndex = 2;
  const stringifiedPrefix = prefix.toString(HEXADECIMAL_SYSTEM_IDENTIFIER);

  const firstByte = Number.parseInt(
    stringifiedPrefix.slice(firstByteStartIndex, secondByteStartIndex),
    HEXADECIMAL_SYSTEM_IDENTIFIER,
  );

  const secondByte = Number.parseInt(
    stringifiedPrefix.slice(secondByteStartIndex),
    HEXADECIMAL_SYSTEM_IDENTIFIER,
  );

  return new Uint8Array(Buffer.from([firstByte, secondByte]));
}

function getTransparentAddress(
  publicKey: CommonKeyPair["publicKey"],
  prefixConfig: PrefixConfig,
): Address["address"] {
  const hash160 = ripemd160(sha256(convertHexToBytes(publicKey)));
  const prefix = splitPrefixIntoBytesArray(prefixConfig.pubKeyHash);
  const addressBytes = new Uint8Array(Buffer.concat([prefix, hash160]));

  return bs58check.encode(addressBytes);
}

export { getTransparentAddress };
