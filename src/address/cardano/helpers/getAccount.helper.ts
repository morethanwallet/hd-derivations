import { Bip32PrivateKey } from "@emurgo/cardano-serialization-lib-nodejs";

const HARDENED_RANGE_START = 2147483648;
const harden = (number: number): number => HARDENED_RANGE_START + number;

function convertDerivationPathToIntegersArray(derivationPath: string): string[] {
  const nanDerivationPathCharactersRegExp = /[m'/]/g;
  const spaceDelimiter = " ";

  return derivationPath
    .replaceAll(nanDerivationPathCharactersRegExp, spaceDelimiter)
    .split(spaceDelimiter)
    .filter((segment) => !Number.isNaN(Number.parseInt(segment)));
}

function getAccount(rootKey: Bip32PrivateKey, derivationPath: string): Bip32PrivateKey {
  const pathSegments = convertDerivationPathToIntegersArray(derivationPath);
  let account = rootKey;

  for (let pathSegment of pathSegments) {
    account = account.derive(harden(Number(pathSegment)));
  }

  return account;
}

export { getAccount };
