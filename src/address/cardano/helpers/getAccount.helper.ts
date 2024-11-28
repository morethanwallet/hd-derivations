import { Bip32PrivateKey } from "@emurgo/cardano-serialization-lib-nodejs";

const HARDENED_RANGE_START = 2147483648;
const PURPOSE_START_INDEX = 0;
const ACCOUNT_END_INDEX = 3;
const harden = (number: number): number => HARDENED_RANGE_START + number;

function convertDerivationPathToAccountSegments(derivationPath: string): string[] {
  const nanDerivationPathCharactersRegExp = /[m'/]/g;
  const spaceDelimiter = " ";

  return derivationPath
    .replaceAll(nanDerivationPathCharactersRegExp, spaceDelimiter)
    .split(spaceDelimiter)
    .filter((segment) => !Number.isNaN(Number.parseInt(segment)))
    .slice(PURPOSE_START_INDEX, ACCOUNT_END_INDEX);
}

function getAccount(rootKey: Bip32PrivateKey, derivationPath: string): Bip32PrivateKey {
  const pathSegments = convertDerivationPathToAccountSegments(derivationPath);
  console.log(pathSegments);
  let account = rootKey;

  for (let pathSegment of pathSegments) {
    account = account.derive(harden(Number(pathSegment)));
  }

  return account;
}

export { getAccount };
