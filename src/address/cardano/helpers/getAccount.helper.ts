import { hardenDerivationPathValue } from "@/helpers/index.js";
import { Bip32PrivateKey } from "@emurgo/cardano-serialization-lib-nodejs";

const PURPOSE_START_INDEX = 0;
const ACCOUNT_END_INDEX = 3;

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
  let account = rootKey;

  for (let pathSegment of pathSegments) {
    account = account.derive(hardenDerivationPathValue(Number(pathSegment)));
  }

  return account;
}

export { getAccount };
