const DERIVATION_PATH_START_INDEX = 0;
const DERIVATION_PATH_ACCOUNT_START_INDEX = 11;
const DERIVATION_PATH_ACCOUNT_END_INDEX = 12;

function appendAddressToDerivationPath(derivationPath: string, addressIndex: number): string {
  return `${derivationPath.slice(
    DERIVATION_PATH_START_INDEX,
    DERIVATION_PATH_ACCOUNT_START_INDEX
  )}${addressIndex}${derivationPath.slice(DERIVATION_PATH_ACCOUNT_END_INDEX)}`;
}

export { appendAddressToDerivationPath };
