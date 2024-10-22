// mnemonics is populated as required by getLanguage
const mnemonics = { english: new Mnemonic("english") };
const mnemonic = mnemonics["english"];
const seed = null;
const bip32RootKey = null;
const bip32ExtendedKey = null;
const network = libs.bitcoin.networks.bitcoin;
const addressRowTemplate = $("#address-row-template");

const showIndex = true;
const showAddress = true;
const showPubKey = true;
const showPrivKey = true;
const showQr = false;
const litecoinUseLtub = true;

const entropyTypeAutoDetect = true;
const entropyChangeTimeoutEvent = null;
const phraseChangeTimeoutEvent = null;
const seedChangedTimeoutEvent = null;
const rootKeyChangedTimeoutEvent = null;

const generationProcesses = [];

function init() {
  // Events
  DOM.privacyScreenToggle.on("change", privacyScreenToggled);
  DOM.generatedStrength.on("change", generatedStrengthChanged);
  DOM.network.on("change", networkChanged);
  DOM.bip32Client.on("change", bip32ClientChanged);
  DOM.useEntropy.on("change", setEntropyVisibility);
  DOM.autoCompute.on("change", delayedPhraseChanged);
  DOM.entropy.on("input", delayedEntropyChanged);
  DOM.entropyMnemonicLength.on("change", entropyChanged);
  DOM.pbkdf2Rounds.on("change", pbkdf2RoundsChanged);
  DOM.pbkdf2CustomInput.on("change", pbkdf2RoundsChanged);
  DOM.entropyTypeInputs.on("change", entropyTypeChanged);
  DOM.phrase.on("input", delayedPhraseChanged);
  DOM.showSplitMnemonic.on("change", toggleSplitMnemonic);
  DOM.passphrase.on("input", delayedPhraseChanged);
  DOM.generate.on("click", generateClicked);
  DOM.more.on("click", showMore);
  DOM.seed.on("input", delayedSeedChanged);
  DOM.rootKey.on("input", delayedRootKeyChanged);
  DOM.showBip85.on("change", toggleBip85);
  DOM.litecoinUseLtub.on("change", litecoinUseLtubChanged);
  DOM.bip32path.on("input", calcForDerivationPath);
  DOM.bip44account.on("input", calcForDerivationPath);
  DOM.bip44change.on("input", calcForDerivationPath);
  DOM.bip49account.on("input", calcForDerivationPath);
  DOM.bip49change.on("input", calcForDerivationPath);
  DOM.bip84account.on("input", calcForDerivationPath);
  DOM.bip84change.on("input", calcForDerivationPath);
  DOM.bip85application.on("input", calcBip85);
  DOM.bip85mnemonicLanguage.on("change", calcBip85);
  DOM.bip85mnemonicLength.on("change", calcBip85);
  DOM.bip85index.on("input", calcBip85);
  DOM.bip85bytes.on("input", calcBip85);
  DOM.bip141path.on("input", calcForDerivationPath);
  DOM.bip141semantics.on("change", tabChanged);
  DOM.tab.on("shown.bs.tab", tabChanged);
  DOM.hardenedAddresses.on("change", calcForDerivationPath);
  DOM.useBip38.on("change", calcForDerivationPath);
  DOM.bip38Password.on("change", calcForDerivationPath);
  DOM.indexToggle.on("click", toggleIndexes);
  DOM.addressToggle.on("click", toggleAddresses);
  DOM.publicKeyToggle.on("click", togglePublicKeys);
  DOM.privateKeyToggle.on("click", togglePrivateKeys);
  DOM.csvTab.on("click", updateCsv);
  DOM.languages.on("click", languageChanged);
  DOM.bitcoinCashAddressType.on("change", bitcoinCashAddressTypeChange);
  setQrEvents(DOM.showQrEls);
  disableForms();
  hidePending();
  hideValidationError();
  populateNetworkSelect();
  populateClientSelect();
}

// Event handlers

function generatedStrengthChanged() {
  const strength = parseInt(DOM.generatedStrength.val());
  if (strength < 12) {
    DOM.generatedStrengthWarning.removeClass("hidden");
  } else {
    DOM.generatedStrengthWarning.addClass("hidden");
  }
}

function networkChanged(e) {
  clearDerivedKeys();
  clearAddressesList();
  DOM.litecoinLtubContainer.addClass("hidden");
  DOM.bitcoinCashAddressTypeContainer.addClass("hidden");
  const networkIndex = e.target.value;
  const network = networks[networkIndex];
  network.onSelect();
  adjustNetworkForSegwit();
  if (seed != null) {
    seedChanged();
  } else {
    rootKeyChanged();
  }
}

function bip32ClientChanged(e) {
  const clientIndex = DOM.bip32Client.val();
  if (clientIndex == "custom") {
    DOM.bip32path.prop("readonly", false);
  } else {
    DOM.bip32path.prop("readonly", true);
    clients[clientIndex].onSelect();
    rootKeyChanged();
  }
}

function isUsingAutoCompute() {
  return DOM.autoCompute.prop("checked");
}

function setEntropyVisibility() {
  if (isUsingOwnEntropy()) {
    DOM.entropyContainer.removeClass("hidden");
    DOM.generateContainer.addClass("hidden");
    DOM.phrase.prop("readonly", true);
    DOM.entropy.focus();
    entropyChanged();
  } else {
    DOM.entropyContainer.addClass("hidden");
    DOM.generateContainer.removeClass("hidden");
    DOM.phrase.prop("readonly", false);
    hidePending();
  }
}

function delayedPhraseChanged() {
  if (isUsingAutoCompute()) {
    hideValidationError();
    seed = null;
    bip32RootKey = null;
    bip32ExtendedKey = null;
    clearAddressesList();
    showPending();
    if (phraseChangeTimeoutEvent != null) {
      clearTimeout(phraseChangeTimeoutEvent);
    }
    phraseChangeTimeoutEvent = setTimeout(function () {
      phraseChanged();
      const entropy = mnemonic.toRawEntropyHex(DOM.phrase.val());
      if (entropy !== null) {
        DOM.entropyMnemonicLength.val("raw");
        DOM.entropy.val(entropy);
        DOM.entropyTypeInputs.filter("[value='hexadecimal']").prop("checked", true);
        entropyTypeAutoDetect = false;
      }
    }, 400);
  } else {
    clearDisplay();
    clearEntropyFeedback();
    showValidationError("Auto compute is disabled");
  }
}

function phraseChanged() {
  showPending();
  setMnemonicLanguage();
  // Get the mnemonic phrase
  const phrase = DOM.phrase.val();
  const errorText = findPhraseErrors(phrase);
  if (errorText) {
    showValidationError(errorText);
    return;
  }
  // Calculate and display
  const passphrase = DOM.passphrase.val();
  calcBip32RootKeyFromSeed(phrase, passphrase);
  calcForDerivationPath();
  calcBip85();
  // Show the word indexes
  showWordIndexes();
  writeSplitPhrase(phrase);
}

function tabChanged() {
  showPending();
  adjustNetworkForSegwit();
  const phrase = DOM.phrase.val();
  const seed = DOM.seed.val();
  if (phrase != "") {
    // Calculate and display for mnemonic
    const errorText = findPhraseErrors(phrase);
    if (errorText) {
      showValidationError(errorText);
      return;
    }
    // Calculate and display
    const passphrase = DOM.passphrase.val();
    calcBip32RootKeyFromSeed(phrase, passphrase);
  } else if (seed != "") {
    bip32RootKey = libs.bitcoin.HDNode.fromSeedHex(seed, network);
    const rootKeyBase58 = bip32RootKey.toBase58();
    DOM.rootKey.val(rootKeyBase58);
  } else {
    // Calculate and display for root key
    const rootKeyBase58 = DOM.rootKey.val();
    const errorText = validateRootKey(rootKeyBase58);
    if (errorText) {
      showValidationError(errorText);
      return;
    }
    // Calculate and display
    calcBip32RootKeyFromBase58(rootKeyBase58);
  }
  calcForDerivationPath();
}

function delayedEntropyChanged() {
  hideValidationError();
  showPending();
  if (entropyChangeTimeoutEvent != null) {
    clearTimeout(entropyChangeTimeoutEvent);
  }
  entropyChangeTimeoutEvent = setTimeout(entropyChanged, 400);
}

function pbkdf2RoundsChanged() {
  if (DOM.pbkdf2Rounds.val() == "custom") {
    PBKDF2_ROUNDS = DOM.pbkdf2CustomInput.val();
    DOM.pbkdf2CustomInput.removeClass("hidden");
  } else {
    PBKDF2_ROUNDS = DOM.pbkdf2Rounds.val();
    DOM.pbkdf2CustomInput.addClass("hidden");
  }
  ispbkdf2Rounds2048();
  phraseChanged();
}
function ispbkdf2Rounds2048() {
  if (PBKDF2_ROUNDS == 2048) {
    DOM.pbkdf2InfosDanger.addClass("hidden");
  } else {
    DOM.pbkdf2InfosDanger.removeClass("hidden");
  }
}
function entropyChanged() {
  // If blank entropy, clear mnemonic, addresses, errors
  if (DOM.entropy.val().trim().length == 0) {
    clearDisplay();
    clearEntropyFeedback();
    DOM.phrase.val("");
    DOM.phraseSplit.val("");
    showValidationError("Blank entropy");
    return;
  }
  // Get the current phrase to detect changes
  const phrase = DOM.phrase.val();
  // Set the phrase from the entropy
  setMnemonicFromEntropy();
  // Recalc addresses if the phrase has changed
  const newPhrase = DOM.phrase.val();
  if (newPhrase != phrase) {
    if (newPhrase.length == 0) {
      clearDisplay();
    } else {
      phraseChanged();
    }
  } else {
    hidePending();
  }
}

function entropyTypeChanged() {
  entropyTypeAutoDetect = false;
  entropyChanged();
}

function delayedSeedChanged() {
  // Warn if there is an existing mnemonic or passphrase.
  if (DOM.phrase.val().length > 0 || DOM.passphrase.val().length > 0) {
    if (!confirm("This will clear existing mnemonic and passphrase")) {
      DOM.seed.val(seed);
      return;
    }
  }
  hideValidationError();
  showPending();
  // Clear existing mnemonic and passphrase
  DOM.phrase.val("");
  DOM.phraseSplit.val("");
  DOM.passphrase.val("");
  DOM.rootKey.val("");
  clearAddressesList();
  clearDerivedKeys();
  seed = null;
  if (seedChangedTimeoutEvent != null) {
    clearTimeout(seedChangedTimeoutEvent);
  }
  seedChangedTimeoutEvent = setTimeout(seedChanged, 400);
}

function delayedRootKeyChanged() {
  // Warn if there is an existing mnemonic or passphrase.
  if (DOM.phrase.val().length > 0 || DOM.passphrase.val().length > 0) {
    if (!confirm("This will clear existing mnemonic and passphrase")) {
      DOM.rootKey.val(bip32RootKey);
      return;
    }
  }
  hideValidationError();
  showPending();
  // Clear existing mnemonic and passphrase
  DOM.phrase.val("");
  DOM.phraseSplit.val("");
  DOM.passphrase.val("");
  seed = null;
  if (rootKeyChangedTimeoutEvent != null) {
    clearTimeout(rootKeyChangedTimeoutEvent);
  }
  rootKeyChangedTimeoutEvent = setTimeout(rootKeyChanged, 400);
}

function seedChanged() {
  showPending();
  hideValidationError();
  seed = DOM.seed.val();
  bip32RootKey = libs.bitcoin.HDNode.fromSeedHex(seed, network);
  const rootKeyBase58 = bip32RootKey.toBase58();
  DOM.rootKey.val(rootKeyBase58);
  const errorText = validateRootKey(rootKeyBase58);
  if (errorText) {
    showValidationError(errorText);
    return;
  }
  // Calculate and display
  calcForDerivationPath();
  calcBip85();
}

function rootKeyChanged() {
  showPending();
  hideValidationError();
  const rootKeyBase58 = DOM.rootKey.val();
  const errorText = validateRootKey(rootKeyBase58);
  if (errorText) {
    showValidationError(errorText);
    return;
  }
  // Calculate and display
  calcBip32RootKeyFromBase58(rootKeyBase58);
  calcForDerivationPath();
  calcBip85();
}

function litecoinUseLtubChanged() {
  litecoinUseLtub = DOM.litecoinUseLtub.prop("checked");
  if (litecoinUseLtub) {
    network = libs.bitcoin.networks.litecoin;
  } else {
    network = libs.bitcoin.networks.litecoinXprv;
  }
  // Can't use rootKeyChanged because validation will fail as we changed
  // the network but the version bytes stayed as previously.
  seedChanged();
}

function toggleSplitMnemonic() {
  if (DOM.showSplitMnemonic.prop("checked")) {
    DOM.splitMnemonic.removeClass("hidden");
  } else {
    DOM.splitMnemonic.addClass("hidden");
  }
}

function toggleBip85() {
  if (DOM.showBip85.prop("checked")) {
    DOM.bip85.removeClass("hidden");
    calcBip85();
  } else {
    DOM.bip85.addClass("hidden");
  }
}

function toggleBip85Fields() {
  if (DOM.showBip85.prop("checked")) {
    DOM.bip85mnemonicLanguageInput.addClass("hidden");
    DOM.bip85mnemonicLengthInput.addClass("hidden");
    DOM.bip85bytesInput.addClass("hidden");

    const app = DOM.bip85application.val();
    if (app === "bip39") {
      DOM.bip85mnemonicLanguageInput.removeClass("hidden");
      DOM.bip85mnemonicLengthInput.removeClass("hidden");
    } else if (app === "hex") {
      DOM.bip85bytesInput.removeClass("hidden");
    }
  }
}

function calcBip85() {
  if (!DOM.showBip85.prop("checked")) {
    return;
  }

  toggleBip85Fields();

  const app = DOM.bip85application.val();

  const rootKeyBase58 = DOM.rootKey.val();
  if (!rootKeyBase58) {
    return;
  }
  try {
    // try parsing using base network params
    // The bip85 lib only understands xpubs, so compute it
    const rootKey = libs.bitcoin.HDNode.fromBase58(rootKeyBase58, network);
    rootKey.keyPair.network = libs.bitcoin.networks["bitcoin"];
    const master = libs.bip85.BIP85.fromBase58(rootKey.toBase58());

    const result;

    const index = parseInt(DOM.bip85index.val(), 10);

    if (app === "bip39") {
      const language = parseInt(DOM.bip85mnemonicLanguage.val(), 10);
      const length = parseInt(DOM.bip85mnemonicLength.val(), 10);

      result = master.deriveBIP39(language, length, index).toMnemonic();
    } else if (app === "wif") {
      result = master.deriveWIF(index).toWIF();
    } else if (app === "xprv") {
      result = master.deriveXPRV(index).toXPRV();
    } else if (app === "hex") {
      const bytes = parseInt(DOM.bip85bytes.val(), 10);

      result = master.deriveHex(bytes, index).toEntropy();
    }

    hideValidationError();
    DOM.bip85Field.val(result);
  } catch (e) {
    showValidationError("BIP85: " + e.message);
    DOM.bip85Field.val("");
  }
}

function calcForDerivationPath() {
  clearDerivedKeys();
  clearAddressesList();
  showPending();
  // Don't show segwit if it's selected but network doesn't support it
  if (segwitSelected() && !networkHasSegwit()) {
    showSegwitUnavailable();
    hidePending();
    return;
  }
  showSegwitAvailable();
  // Get the derivation path
  const derivationPath = getDerivationPath();
  const errorText = findDerivationPathErrors(derivationPath);
  if (errorText) {
    showValidationError(errorText);
    return;
  }
  bip32ExtendedKey = calcBip32ExtendedKey(derivationPath);
  if (bip44TabSelected()) {
    displayBip44Info();
  } else if (bip49TabSelected()) {
    displayBip49Info();
  } else if (bip84TabSelected()) {
    displayBip84Info();
  }
  displayBip32Info();
}

function generateClicked() {
  if (isUsingOwnEntropy()) {
    return;
  }
  // Pressing enter on BIP85 index field triggers generate click event.
  // See https://github.com/iancoleman/bip39/issues/634
  // To cancel the incorrect generation process, stop here if generate is
  // not focused.
  const buttonIsFocused = DOM.generate[0].contains(document.activeElement);
  if (!buttonIsFocused) {
    return;
  }
  clearDisplay();
  showPending();
  setTimeout(function () {
    setMnemonicLanguage();
    const phrase = generateRandomPhrase();
    if (!phrase) {
      return;
    }
    phraseChanged();
  }, 50);
}

function languageChanged() {
  setTimeout(function () {
    setMnemonicLanguage();
    if (DOM.phrase.val().length > 0) {
      const newPhrase = convertPhraseToNewLanguage();
      DOM.phrase.val(newPhrase);
      phraseChanged();
    } else {
      DOM.generate.trigger("click");
    }
  }, 50);
}

function bitcoinCashAddressTypeChange() {
  rootKeyChanged();
}

function toggleIndexes() {
  showIndex = !showIndex;
  $("td.index span").toggleClass("invisible");
}

function toggleAddresses() {
  showAddress = !showAddress;
  $("td.address span").toggleClass("invisible");
}

function togglePublicKeys() {
  showPubKey = !showPubKey;
  $("td.pubkey span").toggleClass("invisible");
}

function togglePrivateKeys() {
  showPrivKey = !showPrivKey;
  $("td.privkey span").toggleClass("invisible");
}

function privacyScreenToggled() {
  // private-data contains elements added to DOM at runtime
  // so catch all by adding visual privacy class to the root of the DOM
  if (DOM.privacyScreenToggle.prop("checked")) {
    $("body").addClass("visual-privacy");
  } else {
    $("body").removeClass("visual-privacy");
  }
}

// Private methods

function generateRandomPhrase() {
  if (!hasStrongRandom()) {
    const errorText = "This browser does not support strong randomness";
    showValidationError(errorText);
    return;
  }
  // get the amount of entropy to use
  const numWords = parseInt(DOM.generatedStrength.val());
  const strength = (numWords / 3) * 32;
  const buffer = new Uint8Array(strength / 8);
  // create secure entropy
  const data = crypto.getRandomValues(buffer);
  // show the words
  const words = mnemonic.toMnemonic(data);
  DOM.phrase.val(words);
  // show the entropy
  const entropyHex = uint8ArrayToHex(data);
  DOM.entropy.val(entropyHex);
  // ensure entropy fields are consistent with what is being displayed
  DOM.entropyMnemonicLength.val("raw");
  return words;
}

function calcBip32RootKeyFromSeed(phrase, passphrase) {
  seed = mnemonic.toSeed(phrase, passphrase);
  bip32RootKey = libs.bitcoin.HDNode.fromSeedHex(seed, network);
  if (isGRS()) bip32RootKey = libs.groestlcoinjs.HDNode.fromSeedHex(seed, network);
}

function calcBip32RootKeyFromBase58(rootKeyBase58) {
  if (isGRS()) {
    calcBip32RootKeyFromBase58GRS(rootKeyBase58);
    return;
  }
  // try parsing with constious segwit network params since this extended
  // key may be from any one of them.
  if (networkHasSegwit()) {
    const n = network;
    if ("baseNetwork" in n) {
      n = libs.bitcoin.networks[n.baseNetwork];
    }
    // try parsing using base network params
    try {
      bip32RootKey = libs.bitcoin.HDNode.fromBase58(rootKeyBase58, n);
      return;
    } catch (e) {}
    // try parsing using p2wpkh params
    if ("p2wpkh" in n) {
      try {
        bip32RootKey = libs.bitcoin.HDNode.fromBase58(rootKeyBase58, n.p2wpkh);
        return;
      } catch (e) {}
    }
    // try parsing using p2wpkh-in-p2sh network params
    if ("p2wpkhInP2sh" in n) {
      try {
        bip32RootKey = libs.bitcoin.HDNode.fromBase58(rootKeyBase58, n.p2wpkhInP2sh);
        return;
      } catch (e) {}
    }
    // try parsing using p2wsh network params
    if ("p2wsh" in n) {
      try {
        bip32RootKey = libs.bitcoin.HDNode.fromBase58(rootKeyBase58, n.p2wsh);
        return;
      } catch (e) {}
    }
    // try parsing using p2wsh-in-p2sh network params
    if ("p2wshInP2sh" in n) {
      try {
        bip32RootKey = libs.bitcoin.HDNode.fromBase58(rootKeyBase58, n.p2wshInP2sh);
        return;
      } catch (e) {}
    }
  }
  // try the network params as currently specified
  bip32RootKey = libs.bitcoin.HDNode.fromBase58(rootKeyBase58, network);
}

function calcBip32RootKeyFromBase58GRS(rootKeyBase58) {
  // try parsing with constious segwit network params since this extended
  // key may be from any one of them.
  if (networkHasSegwit()) {
    const n = network;
    if ("baseNetwork" in n) {
      n = libs.bitcoin.networks[n.baseNetwork];
    }
    // try parsing using base network params
    try {
      bip32RootKey = libs.groestlcoinjs.HDNode.fromBase58(rootKeyBase58, n);
      return;
    } catch (e) {}
    // try parsing using p2wpkh params
    if ("p2wpkh" in n) {
      try {
        bip32RootKey = libs.groestlcoinjs.HDNode.fromBase58(rootKeyBase58, n.p2wpkh);
        return;
      } catch (e) {}
    }
    // try parsing using p2wpkh-in-p2sh network params
    if ("p2wpkhInP2sh" in n) {
      try {
        bip32RootKey = libs.groestlcoinjs.HDNode.fromBase58(rootKeyBase58, n.p2wpkhInP2sh);
        return;
      } catch (e) {}
    }
  }
  // try the network params as currently specified
  bip32RootKey = libs.groestlcoinjs.HDNode.fromBase58(rootKeyBase58, network);
}

function calcBip32ExtendedKey(path) {
  // Check there's a root key to derive from
  if (!bip32RootKey) {
    return bip32RootKey;
  }
  const extendedKey = bip32RootKey;
  // Derive the key from the path
  const pathBits = path.split("/");
  for (const i = 0; i < pathBits.length; i++) {
    const bit = pathBits[i];
    const index = parseInt(bit);
    if (isNaN(index)) {
      continue;
    }
    const hardened = bit[bit.length - 1] == "'";
    const isPriv = !extendedKey.isNeutered();
    const invalidDerivationPath = hardened && !isPriv;
    if (invalidDerivationPath) {
      extendedKey = null;
    } else if (hardened) {
      extendedKey = extendedKey.deriveHardened(index);
    } else {
      extendedKey = extendedKey.derive(index);
    }
  }
  return extendedKey;
}

function showValidationError(errorText) {
  DOM.feedback.text(errorText).show();
}

function hideValidationError() {
  DOM.feedback.text("").hide();
}

function findPhraseErrors(phrase) {
  // Preprocess the words
  phrase = mnemonic.normalizeString(phrase);
  const words = phraseToWordArray(phrase);
  // Detect blank phrase
  if (words.length == 0) {
    return "Blank mnemonic";
  }
  // Check each word
  for (const i = 0; i < words.length; i++) {
    const word = words[i];
    const language = getLanguage();
    if (WORDLISTS[language].indexOf(word) == -1) {
      console.log("Finding closest match to " + word);
      const nearestWord = findNearestWord(word);
      return word + " not in wordlist, did you mean " + nearestWord + "?";
    }
  }
  // Check the words are valid
  const properPhrase = wordArrayToPhrase(words);
  const isValid = mnemonic.check(properPhrase);
  if (!isValid) {
    return "Invalid mnemonic";
  }
  return false;
}

function validateRootKey(rootKeyBase58) {
  if (isGRS()) return validateRootKeyGRS(rootKeyBase58);

  // try constious segwit network params since this extended key may be from
  // any one of them.
  if (networkHasSegwit()) {
    const n = network;
    if ("baseNetwork" in n) {
      n = libs.bitcoin.networks[n.baseNetwork];
    }
    // try parsing using base network params
    try {
      libs.bitcoin.HDNode.fromBase58(rootKeyBase58, n);
      return "";
    } catch (e) {}
    // try parsing using p2wpkh params
    if ("p2wpkh" in n) {
      try {
        libs.bitcoin.HDNode.fromBase58(rootKeyBase58, n.p2wpkh);
        return "";
      } catch (e) {}
    }
    // try parsing using p2wpkh-in-p2sh network params
    if ("p2wpkhInP2sh" in n) {
      try {
        libs.bitcoin.HDNode.fromBase58(rootKeyBase58, n.p2wpkhInP2sh);
        return "";
      } catch (e) {}
    }
    // try parsing using p2wsh network params
    if ("p2wsh" in n) {
      try {
        libs.bitcoin.HDNode.fromBase58(rootKeyBase58, n.p2wsh);
        return "";
      } catch (e) {}
    }
    // try parsing using p2wsh-in-p2sh network params
    if ("p2wshInP2sh" in n) {
      try {
        libs.bitcoin.HDNode.fromBase58(rootKeyBase58, n.p2wshInP2sh);
        return "";
      } catch (e) {}
    }
  }
  // try the network params as currently specified
  try {
    libs.bitcoin.HDNode.fromBase58(rootKeyBase58, network);
  } catch (e) {
    return "Invalid root key";
  }
  return "";
}

function validateRootKeyGRS(rootKeyBase58) {
  // try constious segwit network params since this extended key may be from
  // any one of them.
  if (networkHasSegwit()) {
    const n = network;
    if ("baseNetwork" in n) {
      n = libs.bitcoin.networks[n.baseNetwork];
    }
    // try parsing using base network params
    try {
      libs.groestlcoinjs.HDNode.fromBase58(rootKeyBase58, n);
      return "";
    } catch (e) {}
    // try parsing using p2wpkh params
    if ("p2wpkh" in n) {
      try {
        libs.groestlcoinjs.HDNode.fromBase58(rootKeyBase58, n.p2wpkh);
        return "";
      } catch (e) {}
    }
    // try parsing using p2wpkh-in-p2sh network params
    if ("p2wpkhInP2sh" in n) {
      try {
        libs.groestlcoinjs.HDNode.fromBase58(rootKeyBase58, n.p2wpkhInP2sh);
        return "";
      } catch (e) {}
    }
  }
  // try the network params as currently specified
  try {
    libs.groestlcoinjs.HDNode.fromBase58(rootKeyBase58, network);
  } catch (e) {
    return "Invalid root key";
  }
  return "";
}

function getDerivationPath() {
  if (bip44TabSelected()) {
    const purpose = parseIntNoNaN(DOM.bip44purpose.val(), 44);
    const coin = parseIntNoNaN(DOM.bip44coin.val(), 0);
    const account = parseIntNoNaN(DOM.bip44account.val(), 0);
    const change = parseIntNoNaN(DOM.bip44change.val(), 0);
    const path = "m/";
    path += purpose + "'/";
    path += coin + "'/";
    path += account + "'/";
    path += change;
    DOM.bip44path.val(path);
    const derivationPath = DOM.bip44path.val();
    console.log("Using derivation path from BIP44 tab: " + derivationPath);
    return derivationPath;
  } else if (bip49TabSelected()) {
    const purpose = parseIntNoNaN(DOM.bip49purpose.val(), 49);
    const coin = parseIntNoNaN(DOM.bip49coin.val(), 0);
    const account = parseIntNoNaN(DOM.bip49account.val(), 0);
    const change = parseIntNoNaN(DOM.bip49change.val(), 0);
    const path = "m/";
    path += purpose + "'/";
    path += coin + "'/";
    path += account + "'/";
    path += change;
    DOM.bip49path.val(path);
    const derivationPath = DOM.bip49path.val();
    console.log("Using derivation path from BIP49 tab: " + derivationPath);
    return derivationPath;
  } else if (bip84TabSelected()) {
    const purpose = parseIntNoNaN(DOM.bip84purpose.val(), 84);
    const coin = parseIntNoNaN(DOM.bip84coin.val(), 0);
    const account = parseIntNoNaN(DOM.bip84account.val(), 0);
    const change = parseIntNoNaN(DOM.bip84change.val(), 0);
    const path = "m/";
    path += purpose + "'/";
    path += coin + "'/";
    path += account + "'/";
    path += change;
    DOM.bip84path.val(path);
    const derivationPath = DOM.bip84path.val();
    console.log("Using derivation path from BIP84 tab: " + derivationPath);
    return derivationPath;
  } else if (bip32TabSelected()) {
    const derivationPath = DOM.bip32path.val();
    console.log("Using derivation path from BIP32 tab: " + derivationPath);
    return derivationPath;
  } else if (bip141TabSelected()) {
    const derivationPath = DOM.bip141path.val();
    console.log("Using derivation path from BIP141 tab: " + derivationPath);
    return derivationPath;
  } else {
    console.log("Unknown derivation path");
  }
}

function findDerivationPathErrors(path) {
  // TODO is not perfect but is better than nothing
  // Inspired by
  // https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#test-vectors
  // and
  // https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#extended-keys
  const maxDepth = 255; // TODO verify this!!
  const maxIndexValue = Math.pow(2, 31); // TODO verify this!!
  if (path[0] != "m") {
    return "First character must be 'm'";
  }
  if (path.length > 1) {
    if (path[1] != "/") {
      return "Separator must be '/'";
    }
    const indexes = path.split("/");
    if (indexes.length > maxDepth) {
      return "Derivation depth is " + indexes.length + ", must be less than " + maxDepth;
    }
    for (const depth = 1; depth < indexes.length; depth++) {
      const index = indexes[depth];
      const invalidChars = index.replace(/^[0-9]+'?$/g, "");
      if (invalidChars.length > 0) {
        return "Invalid characters " + invalidChars + " found at depth " + depth;
      }
      const indexValue = parseInt(index.replace("'", ""));
      if (isNaN(depth)) {
        return "Invalid number at depth " + depth;
      }
      if (indexValue > maxIndexValue) {
        return (
          "Value of " + indexValue + " at depth " + depth + " must be less than " + maxIndexValue
        );
      }
    }
  }
  // Check root key exists or else derivation path is useless!
  if (!bip32RootKey) {
    return "No root key";
  }
  // Check no hardened derivation path when using xpub keys
  const hardenedPath = path.indexOf("'") > -1;
  const hardenedAddresses = bip32TabSelected() && DOM.hardenedAddresses.prop("checked");
  const hardened = hardenedPath || hardenedAddresses;
  const isXpubkey = bip32RootKey.isNeutered();
  if (hardened && isXpubkey) {
    return "Hardened derivation path is invalid with xpub key";
  }
  return false;
}

function isGRS() {
  return (
    networks[DOM.network.val()].name == "GRS - Groestlcoin" ||
    networks[DOM.network.val()].name == "GRS - Groestlcoin Testnet"
  );
}

function isELA() {
  return networks[DOM.network.val()].name == "ELA - Elastos";
}

function displayBip44Info() {
  // Get the derivation path for the account
  const purpose = parseIntNoNaN(DOM.bip44purpose.val(), 44);
  const coin = parseIntNoNaN(DOM.bip44coin.val(), 0);
  const account = parseIntNoNaN(DOM.bip44account.val(), 0);
  const path = "m/";
  path += purpose + "'/";
  path += coin + "'/";
  path += account + "'/";
  // Calculate the account extended keys
  const accountExtendedKey = calcBip32ExtendedKey(path);
  const accountXprv = accountExtendedKey.toBase58();
  const accountXpub = accountExtendedKey.neutered().toBase58();

  // Display the extended keys
  DOM.bip44accountXprv.val(accountXprv);
  DOM.bip44accountXpub.val(accountXpub);

  if (isELA()) {
    displayBip44InfoForELA();
  }
}

function displayBip49Info() {
  // Get the derivation path for the account
  const purpose = parseIntNoNaN(DOM.bip49purpose.val(), 49);
  const coin = parseIntNoNaN(DOM.bip49coin.val(), 0);
  const account = parseIntNoNaN(DOM.bip49account.val(), 0);
  const path = "m/";
  path += purpose + "'/";
  path += coin + "'/";
  path += account + "'/";
  // Calculate the account extended keys
  const accountExtendedKey = calcBip32ExtendedKey(path);
  const accountXprv = accountExtendedKey.toBase58();
  const accountXpub = accountExtendedKey.neutered().toBase58();
  // Display the extended keys
  DOM.bip49accountXprv.val(accountXprv);
  DOM.bip49accountXpub.val(accountXpub);
}

function displayBip84Info() {
  // Get the derivation path for the account
  const purpose = parseIntNoNaN(DOM.bip84purpose.val(), 84);
  const coin = parseIntNoNaN(DOM.bip84coin.val(), 0);
  const account = parseIntNoNaN(DOM.bip84account.val(), 0);
  const path = "m/";
  path += purpose + "'/";
  path += coin + "'/";
  path += account + "'/";
  // Calculate the account extended keys
  const accountExtendedKey = calcBip32ExtendedKey(path);
  const accountXprv = accountExtendedKey.toBase58();
  const accountXpub = accountExtendedKey.neutered().toBase58();
  // Display the extended keys
  DOM.bip84accountXprv.val(accountXprv);
  DOM.bip84accountXpub.val(accountXpub);
}

function displayBip32Info() {
  // Display the key
  DOM.seed.val(seed);
  const rootKey = bip32RootKey.toBase58();
  DOM.rootKey.val(rootKey);
  const xprvkeyB58 = "NA";
  if (!bip32ExtendedKey.isNeutered()) {
    xprvkeyB58 = bip32ExtendedKey.toBase58();
  }
  const extendedPrivKey = xprvkeyB58;
  DOM.extendedPrivKey.val(extendedPrivKey);
  const extendedPubKey = bip32ExtendedKey.neutered().toBase58();
  DOM.extendedPubKey.val(extendedPubKey);
  // Display the addresses and privkeys
  clearAddressesList();
  const initialAddressCount = parseInt(DOM.rowsToAdd.val());
  displayAddresses(0, initialAddressCount);

  if (isELA()) {
    displayBip32InfoForELA();
  }
}

function displayAddresses(start, total) {
  generationProcesses.push(
    new (function () {
      const rows = [];

      this.stop = function () {
        for (const i = 0; i < rows.length; i++) {
          rows[i].shouldGenerate = false;
        }
        hidePending();
      };

      for (const i = 0; i < total; i++) {
        const index = i + start;
        const isLast = i == total - 1;
        rows.push(new TableRow(index, isLast));
      }
    })()
  );
}

function segwitSelected() {
  return bip49TabSelected() || bip84TabSelected() || bip141TabSelected();
}

function p2wpkhSelected() {
  return bip84TabSelected() || (bip141TabSelected() && DOM.bip141semantics.val() == "p2wpkh");
}

function p2wpkhInP2shSelected() {
  return bip49TabSelected() || (bip141TabSelected() && DOM.bip141semantics.val() == "p2wpkh-p2sh");
}

function p2wshSelected() {
  return bip141TabSelected() && DOM.bip141semantics.val() == "p2wsh";
}

function p2wshInP2shSelected() {
  return bip141TabSelected() && DOM.bip141semantics.val() == "p2wsh-p2sh";
}

function TableRow(index, isLast) {
  const self = this;
  this.shouldGenerate = true;
  const useHardenedAddresses = DOM.hardenedAddresses.prop("checked");
  const useBip38 = DOM.useBip38.prop("checked");
  const bip38password = DOM.bip38Password.val();
  const isSegwit = segwitSelected();
  const segwitAvailable = networkHasSegwit();
  const isP2wpkh = p2wpkhSelected();
  const isP2wpkhInP2sh = p2wpkhInP2shSelected();
  const isP2wsh = p2wshSelected();
  const isP2wshInP2sh = p2wshInP2shSelected();

  function init() {
    calculateValues();
  }

  function calculateValues() {
    setTimeout(function () {
      if (!self.shouldGenerate) {
        return;
      }
      // derive HDkey for this row of the table
      const key = "NA";
      if (useHardenedAddresses) {
        key = bip32ExtendedKey.deriveHardened(index);
      } else {
        key = bip32ExtendedKey.derive(index);
      }
      // bip38 requires uncompressed keys
      // see https://github.com/iancoleman/bip39/issues/140#issuecomment-352164035
      const keyPair = key.keyPair;
      const useUncompressed = useBip38;
      if (useUncompressed) {
        keyPair = new libs.bitcoin.ECPair(keyPair.d, null, {
          network: network,
          compressed: false,
        });
        if (isGRS())
          keyPair = new libs.groestlcoinjs.ECPair(keyPair.d, null, {
            network: network,
            compressed: false,
          });
      }
      // get address
      const address = keyPair.getAddress().toString();
      // get privkey
      const hasPrivkey = !key.isNeutered();
      const privkey = "NA";
      if (hasPrivkey) {
        privkey = keyPair.toWIF();
        // BIP38 encode private key if required
        if (useBip38) {
          if (isGRS())
            privkey = libs.groestlcoinjsBip38.encrypt(
              keyPair.d.toBuffer(),
              false,
              bip38password,
              function (p) {
                console.log("Progressed " + p.percent.toFixed(1) + "% for index " + index);
              },
              null,
              networks[DOM.network.val()].name.includes("Testnet")
            );
          else
            privkey = libs.bip38.encrypt(keyPair.d.toBuffer(), false, bip38password, function (p) {
              console.log("Progressed " + p.percent.toFixed(1) + "% for index " + index);
            });
        }
      }
      // get pubkey
      const pubkey = keyPair.getPublicKeyBuffer().toString("hex");
      const indexText = getDerivationPath() + "/" + index;
      if (useHardenedAddresses) {
        indexText = indexText + "'";
      }
      // Ethereum values are different
      if (networkIsEthereum()) {
        const pubkeyBuffer = keyPair.getPublicKeyBuffer();
        const ethPubkey = libs.ethUtil.importPublic(pubkeyBuffer);
        const addressBuffer = libs.ethUtil.publicToAddress(ethPubkey);
        const hexAddress = addressBuffer.toString("hex");
        const checksumAddress = libs.ethUtil.toChecksumAddress(hexAddress);
        address = libs.ethUtil.addHexPrefix(checksumAddress);
        pubkey = libs.ethUtil.addHexPrefix(pubkey);
        if (hasPrivkey) {
          privkey = libs.ethUtil.bufferToHex(keyPair.d.toBuffer(32));
        }
      }
      //TRX is different
      if (networks[DOM.network.val()].name == "TRX - Tron") {
        keyPair = new libs.bitcoin.ECPair(keyPair.d, null, {
          network: network,
          compressed: false,
        });
        const pubkeyBuffer = keyPair.getPublicKeyBuffer();
        const ethPubkey = libs.ethUtil.importPublic(pubkeyBuffer);
        const addressBuffer = libs.ethUtil.publicToAddress(ethPubkey);
        address = libs.bitcoin.address.toBase58Check(addressBuffer, 0x41);
        if (hasPrivkey) {
          privkey = keyPair.d.toBuffer().toString("hex");
        }
      }

      // RSK values are different
      if (networkIsRsk()) {
        const pubkeyBuffer = keyPair.getPublicKeyBuffer();
        const ethPubkey = libs.ethUtil.importPublic(pubkeyBuffer);
        const addressBuffer = libs.ethUtil.publicToAddress(ethPubkey);
        const hexAddress = addressBuffer.toString("hex");
        // Use chainId based on selected network
        // Ref: https://developers.rsk.co/rsk/architecture/account-based/#chainid
        const chainId;
        const rskNetworkName = networks[DOM.network.val()].name;
        switch (rskNetworkName) {
          case "R-BTC - RSK":
            chainId = 30;
            break;
          case "tR-BTC - RSK Testnet":
            chainId = 31;
            break;
          default:
            chainId = null;
        }
        const checksumAddress = toChecksumAddressForRsk(hexAddress, chainId);
        address = libs.ethUtil.addHexPrefix(checksumAddress);
        pubkey = libs.ethUtil.addHexPrefix(pubkey);
        if (hasPrivkey) {
          privkey = libs.ethUtil.bufferToHex(keyPair.d.toBuffer());
        }
      }

      // Handshake values are different
      if (networks[DOM.network.val()].name == "HNS - Handshake") {
        const ring = libs.handshake.KeyRing.fromPublic(keyPair.getPublicKeyBuffer());
        address = ring.getAddress().toString();
      }

      // Stellar is different
      if (networks[DOM.network.val()].name == "XLM - Stellar") {
        const purpose = parseIntNoNaN(DOM.bip44purpose.val(), 44);
        const coin = parseIntNoNaN(DOM.bip44coin.val(), 0);
        const path = "m/";
        path += purpose + "'/";
        path += coin + "'/" + index + "'";
        const keypair = libs.stellarUtil.getKeypair(path, seed);
        indexText = path;
        privkey = keypair.secret();
        pubkey = address = keypair.publicKey();
      }

      // Nano currency
      if (networks[DOM.network.val()].name == "NANO - Nano") {
        const nanoKeypair = libs.nanoUtil.getKeypair(index, seed);
        privkey = nanoKeypair.privKey;
        pubkey = nanoKeypair.pubKey;
        address = nanoKeypair.address;
      }

      if (networks[DOM.network.val()].name == "NAS - Nebulas") {
        const privKeyBuffer = keyPair.d.toBuffer(32);
        const nebulasAccount = libs.nebulas.Account.NewAccount();
        nebulasAccount.setPrivateKey(privKeyBuffer);
        address = nebulasAccount.getAddressString();
        privkey = nebulasAccount.getPrivateKeyString();
        pubkey = nebulasAccount.getPublicKeyString();
      }
      // Ripple values are different
      if (networks[DOM.network.val()].name == "XRP - Ripple") {
        privkey = convertRipplePriv(privkey);
        address = convertRippleAdrr(address);
      }
      // Jingtum values are different
      if (networks[DOM.network.val()].name == "SWTC - Jingtum") {
        privkey = convertJingtumPriv(privkey);
        address = convertJingtumAdrr(address);
      }
      // CasinoCoin values are different
      if (networks[DOM.network.val()].name == "CSC - CasinoCoin") {
        privkey = convertCasinoCoinPriv(privkey);
        address = convertCasinoCoinAdrr(address);
      }
      // Bitcoin Cash address format may consty
      if (networks[DOM.network.val()].name == "BCH - Bitcoin Cash") {
        const bchAddrType = DOM.bitcoinCashAddressType.filter(":checked").val();
        if (bchAddrType == "cashaddr") {
          address = libs.bchaddr.toCashAddress(address);
        } else if (bchAddrType == "bitpay") {
          address = libs.bchaddr.toBitpayAddress(address);
        }
      }
      // Bitcoin Cash address format may consty
      if (networks[DOM.network.val()].name == "SLP - Simple Ledger Protocol") {
        const bchAddrType = DOM.bitcoinCashAddressType.filter(":checked").val();
        if (bchAddrType == "cashaddr") {
          address = libs.bchaddrSlp.toSlpAddress(address);
        }
      }

      // ZooBC address format may consty
      if (networks[DOM.network.val()].name == "ZBC - ZooBlockchain") {
        const purpose = parseIntNoNaN(DOM.bip44purpose.val(), 44);
        const coin = parseIntNoNaN(DOM.bip44coin.val(), 0);
        const path = "m/";
        path += purpose + "'/";
        path += coin + "'/" + index + "'";
        const result = libs.zoobcUtil.getKeypair(path, seed);

        let publicKey = result.pubKey.slice(1, 33);
        let privateKey = result.key;

        privkey = privateKey.toString("hex");
        pubkey = publicKey.toString("hex");

        indexText = path;
        address = libs.zoobcUtil.getZBCAddress(publicKey, "ZBC");
      }

      // Segwit addresses are different
      if (isSegwit) {
        if (!segwitAvailable) {
          return;
        }
        if (isP2wpkh) {
          const keyhash = libs.bitcoin.crypto.hash160(key.getPublicKeyBuffer());
          const scriptpubkey = libs.bitcoin.script.witnessPubKeyHash.output.encode(keyhash);
          address = libs.bitcoin.address.fromOutputScript(scriptpubkey, network);
        } else if (isP2wpkhInP2sh) {
          const keyhash = libs.bitcoin.crypto.hash160(key.getPublicKeyBuffer());
          const scriptsig = libs.bitcoin.script.witnessPubKeyHash.output.encode(keyhash);
          const addressbytes = libs.bitcoin.crypto.hash160(scriptsig);
          const scriptpubkey = libs.bitcoin.script.scriptHash.output.encode(addressbytes);
          address = libs.bitcoin.address.fromOutputScript(scriptpubkey, network);
        } else if (isP2wsh) {
          // https://github.com/libs.bitcoinjs-lib/blob/v3.3.2/test/integration/addresses.js#L71
          // This is a 1-of-1
          const witnessScript = libs.bitcoin.script.multisig.output.encode(1, [
            key.getPublicKeyBuffer(),
          ]);
          const scriptPubKey = libs.bitcoin.script.witnessScriptHash.output.encode(
            libs.bitcoin.crypto.sha256(witnessScript)
          );
          address = libs.bitcoin.address.fromOutputScript(scriptPubKey, network);
        } else if (isP2wshInP2sh) {
          // https://github.com/libs.bitcoinjs-lib/blob/v3.3.2/test/integration/transactions.js#L183
          // This is a 1-of-1
          const witnessScript = libs.bitcoin.script.multisig.output.encode(1, [
            key.getPublicKeyBuffer(),
          ]);
          const redeemScript = libs.bitcoin.script.witnessScriptHash.output.encode(
            libs.bitcoin.crypto.sha256(witnessScript)
          );
          const scriptPubKey = libs.bitcoin.script.scriptHash.output.encode(
            libs.bitcoin.crypto.hash160(redeemScript)
          );
          address = libs.bitcoin.address.fromOutputScript(scriptPubKey, network);
        }
      }

      if (networks[DOM.network.val()].name == "CRW - Crown") {
        address = libs.bitcoin.networks.crown.toNewAddress(address);
      }

      if (networks[DOM.network.val()].name == "EOS - EOSIO") {
        address = "";
        pubkey = EOSbufferToPublic(keyPair.getPublicKeyBuffer());
        privkey = EOSbufferToPrivate(keyPair.d.toBuffer(32));
      }

      if (networks[DOM.network.val()].name == "FIO - Foundation for Interwallet Operability") {
        address = "";
        pubkey = FIObufferToPublic(keyPair.getPublicKeyBuffer());
        privkey = FIObufferToPrivate(keyPair.d.toBuffer(32));
      }

      if (networks[DOM.network.val()].name == "ATOM - Cosmos Hub") {
        const hrp = "cosmos";
        address = CosmosBufferToAddress(keyPair.getPublicKeyBuffer(), hrp);
        pubkey = CosmosBufferToPublic(keyPair.getPublicKeyBuffer(), hrp);
        privkey = keyPair.d.toBuffer().toString("base64");
      }

      if (networks[DOM.network.val()].name == "RUNE - THORChain") {
        const hrp = "thor";
        address = CosmosBufferToAddress(keyPair.getPublicKeyBuffer(), hrp);
        pubkey = keyPair.getPublicKeyBuffer().toString("hex");
        privkey = keyPair.d.toBuffer().toString("hex");
      }

      if (networks[DOM.network.val()].name == "XWC - Whitecoin") {
        address = XWCbufferToAddress(keyPair.getPublicKeyBuffer());
        pubkey = XWCbufferToPublic(keyPair.getPublicKeyBuffer());
        privkey = XWCbufferToPrivate(keyPair.d.toBuffer(32));
      }

      if (networks[DOM.network.val()].name == "LUNA - Terra") {
        const hrp = "terra";
        address = CosmosBufferToAddress(keyPair.getPublicKeyBuffer(), hrp);
        pubkey = keyPair.getPublicKeyBuffer().toString("hex");
        privkey = keyPair.d.toBuffer().toString("hex");
      }

      if (networks[DOM.network.val()].name == "IOV - Starname") {
        const hrp = "star";
        address = CosmosBufferToAddress(keyPair.getPublicKeyBuffer(), hrp);
        pubkey = CosmosBufferToPublic(keyPair.getPublicKeyBuffer(), hrp);
        privkey = keyPair.d.toBuffer().toString("base64");
      }

      //Groestlcoin Addresses are different
      if (isGRS()) {
        if (isSegwit) {
          if (!segwitAvailable) {
            return;
          }
          if (isP2wpkh) {
            address = libs.groestlcoinjs.address.fromOutputScript(scriptpubkey, network);
          } else if (isP2wpkhInP2sh) {
            address = libs.groestlcoinjs.address.fromOutputScript(scriptpubkey, network);
          }
        }
        //non-segwit addresses are handled by using groestlcoinjs for bip32RootKey
      }

      if (isELA()) {
        let elaAddress = calcAddressForELA(
          seed,
          parseIntNoNaN(DOM.bip44coin.val(), 0),
          parseIntNoNaN(DOM.bip44account.val(), 0),
          parseIntNoNaN(DOM.bip44change.val(), 0),
          index
        );
        address = elaAddress.address;
        privkey = elaAddress.privateKey;
        pubkey = elaAddress.publicKey;
      }

      addAddressToList(indexText, address, pubkey, privkey);
      if (isLast) {
        hidePending();
        updateCsv();
      }
    }, 50);
  }

  init();
}

function showMore() {
  const rowsToAdd = parseInt(DOM.rowsToAdd.val());
  if (isNaN(rowsToAdd)) {
    rowsToAdd = 20;
    DOM.rowsToAdd.val("20");
  }
  const start = parseInt(DOM.moreRowsStartIndex.val());
  if (isNaN(start)) {
    start = lastIndexInTable() + 1;
  } else {
    const newStart = start + rowsToAdd;
    DOM.moreRowsStartIndex.val(newStart);
  }
  if (rowsToAdd > 200) {
    const msg = "Generating " + rowsToAdd + " rows could take a while. ";
    msg += "Do you want to continue?";
    if (!confirm(msg)) {
      return;
    }
  }
  displayAddresses(start, rowsToAdd);
}

function clearDisplay() {
  clearAddressesList();
  clearKeys();
  hideValidationError();
}

function clearAddressesList() {
  DOM.addresses.empty();
  DOM.csv.val("");
  stopGenerating();
}

function stopGenerating() {
  while (generationProcesses.length > 0) {
    const generation = generationProcesses.shift();
    generation.stop();
  }
}

function clearKeys() {
  clearRootKey();
  clearDerivedKeys();
}

function clearRootKey() {
  DOM.rootKey.val("");
}

function clearDerivedKeys() {
  DOM.extendedPrivKey.val("");
  DOM.extendedPubKey.val("");
  DOM.bip44accountXprv.val("");
  DOM.bip44accountXpub.val("");
}

function addAddressToList(indexText, address, pubkey, privkey) {
  const row = $(addressRowTemplate.html());
  // Elements
  const indexCell = row.find(".index span");
  const addressCell = row.find(".address span");
  const pubkeyCell = row.find(".pubkey span");
  const privkeyCell = row.find(".privkey span");
  // Content
  indexCell.text(indexText);
  addressCell.text(address);
  pubkeyCell.text(pubkey);
  privkeyCell.text(privkey);
  // Visibility
  if (!showIndex) {
    indexCell.addClass("invisible");
  }
  if (!showAddress) {
    addressCell.addClass("invisible");
  }
  if (!showPubKey) {
    pubkeyCell.addClass("invisible");
  }
  if (!showPrivKey) {
    privkeyCell.addClass("invisible");
  }
  DOM.addresses.append(row);
  const rowShowQrEls = row.find("[data-show-qr]");
  setQrEvents(rowShowQrEls);
}

function hasStrongRandom() {
  return "crypto" in window && window["crypto"] !== null;
}

function disableForms() {
  $("form").on("submit", function (e) {
    e.preventDefault();
  });
}

function parseIntNoNaN(val, defaultVal) {
  const v = parseInt(val);
  if (isNaN(v)) {
    return defaultVal;
  }
  return v;
}

function showPending() {
  DOM.feedback.text("Calculating...").show();
}

function findNearestWord(word) {
  const language = getLanguage();
  const words = WORDLISTS[language];
  const minDistance = 99;
  const closestWord = words[0];
  for (const i = 0; i < words.length; i++) {
    const comparedTo = words[i];
    if (comparedTo.indexOf(word) == 0) {
      return comparedTo;
    }
    const distance = libs.levenshtein.get(word, comparedTo);
    if (distance < minDistance) {
      closestWord = comparedTo;
      minDistance = distance;
    }
  }
  return closestWord;
}

function hidePending() {
  DOM.feedback.text("").hide();
}

function populateNetworkSelect() {
  for (const i = 0; i < networks.length; i++) {
    const network = networks[i];
    const option = $("<option>");
    option.attr("value", i);
    option.text(network.name);
    if (network.name == "BTC - Bitcoin") {
      option.prop("selected", true);
    }
    DOM.phraseNetwork.append(option);
  }
}

function populateClientSelect() {
  for (const i = 0; i < clients.length; i++) {
    const client = clients[i];
    const option = $("<option>");
    option.attr("value", i);
    option.text(client.name);
    DOM.bip32Client.append(option);
  }
}

function getLanguage() {
  const defaultLanguage = "english";
  // Try to get from existing phrase
  const language = getLanguageFromPhrase();
  // Try to get from url if not from phrase
  if (language.length == 0) {
    language = getLanguageFromUrl();
  }
  // Default to English if no other option
  if (language.length == 0) {
    language = defaultLanguage;
  }
  return language;
}

function getLanguageFromPhrase(phrase) {
  // Check if how many words from existing phrase match a language.
  const language = "";
  if (!phrase) {
    phrase = DOM.phrase.val();
  }
  if (phrase.length > 0) {
    const words = phraseToWordArray(phrase);
    const languageMatches = {};
    for (l in WORDLISTS) {
      // Track how many words match in this language
      languageMatches[l] = 0;
      for (const i = 0; i < words.length; i++) {
        const wordInLanguage = WORDLISTS[l].indexOf(words[i]) > -1;
        if (wordInLanguage) {
          languageMatches[l]++;
        }
      }
      // Find languages with most word matches.
      // This is made difficult due to commonalities between Chinese
      // simplified vs traditional.
      const mostMatches = 0;
      const mostMatchedLanguages = [];
      for (const l in languageMatches) {
        const numMatches = languageMatches[l];
        if (numMatches > mostMatches) {
          mostMatches = numMatches;
          mostMatchedLanguages = [l];
        } else if (numMatches == mostMatches) {
          mostMatchedLanguages.push(l);
        }
      }
    }
    if (mostMatchedLanguages.length > 0) {
      // Use first language and warn if multiple detected
      language = mostMatchedLanguages[0];
      if (mostMatchedLanguages.length > 1) {
        console.warn("Multiple possible languages");
        console.warn(mostMatchedLanguages);
      }
    }
  }
  return language;
}

function getLanguageFromUrl() {
  for (const language in WORDLISTS) {
    if (window.location.hash.indexOf(language) > -1) {
      return language;
    }
  }
  return "";
}

function setMnemonicLanguage() {
  const language = getLanguage();
  // Load the bip39 mnemonic generator for this language if required
  if (!(language in mnemonics)) {
    mnemonics[language] = new Mnemonic(language);
  }
  mnemonic = mnemonics[language];
}

function convertPhraseToNewLanguage() {
  const oldLanguage = getLanguageFromPhrase();
  const newLanguage = getLanguageFromUrl();
  const oldPhrase = DOM.phrase.val();
  const oldWords = phraseToWordArray(oldPhrase);
  const newWords = [];
  for (const i = 0; i < oldWords.length; i++) {
    const oldWord = oldWords[i];
    const index = WORDLISTS[oldLanguage].indexOf(oldWord);
    const newWord = WORDLISTS[newLanguage][index];
    newWords.push(newWord);
  }
  newPhrase = wordArrayToPhrase(newWords);
  return newPhrase;
}

// TODO look at jsbip39 - mnemonic.splitWords
function phraseToWordArray(phrase) {
  const words = phrase.split(/\s/g);
  const noBlanks = [];
  for (const i = 0; i < words.length; i++) {
    const word = words[i];
    if (word.length > 0) {
      noBlanks.push(word);
    }
  }
  return noBlanks;
}

// TODO look at jsbip39 - mnemonic.joinWords
function wordArrayToPhrase(words) {
  const phrase = words.join(" ");
  const language = getLanguageFromPhrase(phrase);
  if (language == "japanese") {
    phrase = words.join("\u3000");
  }
  return phrase;
}

function writeSplitPhrase(phrase) {
  const wordCount = phrase.split(/\s/g).length;
  const left = [];
  for (const i = 0; i < wordCount; i++) left.push(i);
  const group = [[], [], []],
    groupI = -1;
  const seed = Math.abs(sjcl.hash.sha256.hash(phrase)[0]) % 2147483647;
  while (left.length > 0) {
    groupI = (groupI + 1) % 3;
    seed = (seed * 16807) % 2147483647;
    const selected = Math.floor((left.length * (seed - 1)) / 2147483646);
    group[groupI].push(left[selected]);
    left.splice(selected, 1);
  }
  const cards = [phrase.split(/\s/g), phrase.split(/\s/g), phrase.split(/\s/g)];
  for (const i = 0; i < 3; i++) {
    for (const ii = 0; ii < wordCount / 3; ii++) cards[i][group[i][ii]] = "XXXX";
    cards[i] = "Card " + (i + 1) + ": " + wordArrayToPhrase(cards[i]);
  }
  DOM.phraseSplit.val(cards.join("\r\n"));
  const triesPerSecond = 10000000000;
  const hackTime = Math.pow(2, (wordCount * 10) / 3) / triesPerSecond;
  const displayRedText = false;
  if (hackTime < 1) {
    hackTime = "<1 second";
    displayRedText = true;
  } else if (hackTime < 86400) {
    hackTime = Math.floor(hackTime) + " seconds";
    displayRedText = true;
  } else if (hackTime < 31557600) {
    hackTime = Math.floor(hackTime / 86400) + " days";
    displayRedText = true;
  } else {
    hackTime = Math.floor(hackTime / 31557600) + " years";
  }
  DOM.phraseSplitWarn.html("Time to hack with only one card: " + hackTime);
  if (displayRedText) {
    DOM.phraseSplitWarn.addClass("text-danger");
  } else {
    DOM.phraseSplitWarn.removeClass("text-danger");
  }
}

function isUsingOwnEntropy() {
  return DOM.useEntropy.prop("checked");
}

function setMnemonicFromEntropy() {
  clearEntropyFeedback();
  // Get entropy value
  const entropyStr = DOM.entropy.val();
  // Work out minimum base for entropy
  const entropy = null;
  if (entropyTypeAutoDetect) {
    entropy = Entropy.fromString(entropyStr);
  } else {
    let base = DOM.entropyTypeInputs.filter(":checked").val();
    entropy = Entropy.fromString(entropyStr, base);
  }
  if (entropy.binaryStr.length == 0) {
    return;
  }
  // Show entropy details
  showEntropyFeedback(entropy);
  // Use entropy hash if not using raw entropy
  const bits = entropy.binaryStr;
  const mnemonicLength = DOM.entropyMnemonicLength.val();
  if (mnemonicLength != "raw") {
    // Get bits by hashing entropy with SHA256
    const hash = sjcl.hash.sha256.hash(entropy.cleanStr);
    const hex = sjcl.codec.hex.fromBits(hash);
    bits = libs.BigInteger.BigInteger.parse(hex, 16).toString(2);
    while (bits.length % 256 != 0) {
      bits = "0" + bits;
    }
    // Truncate hash to suit number of words
    mnemonicLength = parseInt(mnemonicLength);
    const numberOfBits = (32 * mnemonicLength) / 3;
    bits = bits.substring(0, numberOfBits);
    // show warning for weak entropy override
    if ((mnemonicLength / 3) * 32 > entropy.binaryStr.length) {
      DOM.entropyWeakEntropyOverrideWarning.removeClass("hidden");
    } else {
      DOM.entropyWeakEntropyOverrideWarning.addClass("hidden");
    }
  } else {
    // hide warning for weak entropy override
    DOM.entropyWeakEntropyOverrideWarning.addClass("hidden");
  }
  // Discard trailing entropy
  const bitsToUse = Math.floor(bits.length / 32) * 32;
  const start = bits.length - bitsToUse;
  const binaryStr = bits.substring(start);
  // Convert entropy string to numeric array
  const entropyArr = [];
  for (const i = 0; i < binaryStr.length / 8; i++) {
    const byteAsBits = binaryStr.substring(i * 8, i * 8 + 8);
    const entropyByte = parseInt(byteAsBits, 2);
    entropyArr.push(entropyByte);
  }
  // Convert entropy array to mnemonic
  const phrase = mnemonic.toMnemonic(entropyArr);
  // Set the mnemonic in the UI
  DOM.phrase.val(phrase);
  writeSplitPhrase(phrase);
  // Show the word indexes
  showWordIndexes();
  // Show the checksum
  showChecksum();
}

function clearEntropyFeedback() {
  DOM.entropyCrackTime.text("...");
  DOM.entropyType.text("");
  DOM.entropyWordCount.text("0");
  DOM.entropyEventCount.text("0");
  DOM.entropyBitsPerEvent.text("0");
  DOM.entropyBits.text("0");
  DOM.entropyFiltered.html("&nbsp;");
  DOM.entropyBinary.html("&nbsp;");
}

function showEntropyFeedback(entropy) {
  const numberOfBits = entropy.binaryStr.length;
  const timeToCrack = "unknown";
  try {
    const z = libs.zxcvbn(entropy.base.events.join(""));
    timeToCrack = z.crack_times_display.offline_fast_hashing_1e10_per_second;
    if (z.feedback.warning != "") {
      timeToCrack = timeToCrack + " - " + z.feedback.warning;
    }
  } catch (e) {
    console.log("Error detecting entropy strength with zxcvbn:");
    console.log(e);
  }
  const entropyTypeStr = getEntropyTypeStr(entropy);
  DOM.entropyTypeInputs.attr("checked", false);
  DOM.entropyTypeInputs.filter("[value='" + entropyTypeStr + "']").attr("checked", true);
  const wordCount = Math.floor(numberOfBits / 32) * 3;
  const bitsPerEvent = entropy.bitsPerEvent.toFixed(2);
  const spacedBinaryStr = addSpacesEveryElevenBits(entropy.binaryStr);
  DOM.entropyFiltered.html(entropy.cleanHtml);
  DOM.entropyType.text(entropyTypeStr);
  DOM.entropyCrackTime.text(timeToCrack);
  DOM.entropyEventCount.text(entropy.base.events.length);
  DOM.entropyBits.text(numberOfBits);
  DOM.entropyWordCount.text(wordCount);
  DOM.entropyBinary.text(spacedBinaryStr);
  DOM.entropyBitsPerEvent.text(bitsPerEvent);
  // detect and warn of filtering
  const rawNoSpaces = DOM.entropy.val().replace(/\s/g, "");
  const cleanNoSpaces = entropy.cleanStr.replace(/\s/g, "");
  const isFiltered = rawNoSpaces.length != cleanNoSpaces.length;
  if (isFiltered) {
    DOM.entropyFilterWarning.removeClass("hidden");
  } else {
    DOM.entropyFilterWarning.addClass("hidden");
  }
}

function getEntropyTypeStr(entropy) {
  const typeStr = entropy.base.str;
  // Add some detail if these are cards
  if (entropy.base.asInt == 52) {
    const cardDetail = []; // array of message strings
    // Detect duplicates
    const dupes = [];
    const dupeTracker = {};
    for (const i = 0; i < entropy.base.events.length; i++) {
      const card = entropy.base.events[i];
      const cardUpper = card.toUpperCase();
      if (cardUpper in dupeTracker) {
        dupes.push(card);
      }
      dupeTracker[cardUpper] = true;
    }
    if (dupes.length > 0) {
      const dupeWord = "duplicates";
      if (dupes.length == 1) {
        dupeWord = "duplicate";
      }
      const msg = dupes.length + " " + dupeWord + ": " + dupes.slice(0, 3).join(" ");
      if (dupes.length > 3) {
        msg += "...";
      }
      cardDetail.push(msg);
    }
    // Detect full deck
    const uniqueCards = [];
    for (const uniqueCard in dupeTracker) {
      uniqueCards.push(uniqueCard);
    }
    if (uniqueCards.length == 52) {
      cardDetail.unshift("full deck");
    }
    // Detect missing cards
    const values = "A23456789TJQK";
    const suits = "CDHS";
    const missingCards = [];
    for (const i = 0; i < suits.length; i++) {
      for (const j = 0; j < values.length; j++) {
        const card = values[j] + suits[i];
        if (!(card in dupeTracker)) {
          missingCards.push(card);
        }
      }
    }
    // Display missing cards if six or less, ie clearly going for full deck
    if (missingCards.length > 0 && missingCards.length <= 6) {
      const msg = missingCards.length + " missing: " + missingCards.slice(0, 3).join(" ");
      if (missingCards.length > 3) {
        msg += "...";
      }
      cardDetail.push(msg);
    }
    // Add card details to typeStr
    if (cardDetail.length > 0) {
      typeStr += " (" + cardDetail.join(", ") + ")";
    }
  }
  return typeStr;
}

function setQrEvents(els) {
  els.on("mouseenter", createQr);
  els.on("mouseleave", destroyQr);
  els.on("click", toggleQr);
}

function createQr(e) {
  const content = e.target.textContent || e.target.value;
  if (content) {
    const qrEl = libs.kjua({
      text: content,
      render: "canvas",
      size: 310,
      ecLevel: "H",
    });
    DOM.qrImage.append(qrEl);
    if (!showQr) {
      DOM.qrHider.addClass("hidden");
    } else {
      DOM.qrHider.removeClass("hidden");
    }
    DOM.qrContainer.removeClass("hidden");
  }
}

function destroyQr() {
  DOM.qrImage.text("");
  DOM.qrContainer.addClass("hidden");
}

function toggleQr() {
  showQr = !showQr;
  DOM.qrHider.toggleClass("hidden");
  DOM.qrHint.toggleClass("hidden");
}

function bip44TabSelected() {
  return DOM.bip44tab.hasClass("active");
}

function bip32TabSelected() {
  return DOM.bip32tab.hasClass("active");
}

function networkIsEthereum() {
  const name = networks[DOM.network.val()].name;
  return (
    name == "ETH - Ethereum" ||
    name == "ETC - Ethereum Classic" ||
    name == "EWT - EnergyWeb" ||
    name == "PIRL - Pirl" ||
    name == "MIX - MIX" ||
    name == "MOAC - MOAC" ||
    name == "MUSIC - Musicoin" ||
    name == "POA - Poa" ||
    name == "EXP - Expanse" ||
    name == "CLO - Callisto" ||
    name == "DXN - DEXON" ||
    name == "ELLA - Ellaism" ||
    name == "ESN - Ethersocial Network" ||
    name == "VET - VeChain" ||
    name == "ERE - EtherCore" ||
    name == "BSC - Binance Smart Chain"
  );
}

function networkIsRsk() {
  const name = networks[DOM.network.val()].name;
  return name == "R-BTC - RSK" || name == "tR-BTC - RSK Testnet";
}

function networkHasSegwit() {
  const n = network;
  if ("baseNetwork" in network) {
    n = libs.bitcoin.networks[network.baseNetwork];
  }
  // check if only p2wpkh params are required
  if (p2wpkhSelected()) {
    return "p2wpkh" in n;
  }
  // check if only p2wpkh-in-p2sh params are required
  else if (p2wpkhInP2shSelected()) {
    return "p2wpkhInP2sh" in n;
  }
  // require both if it's unclear which params are required
  return "p2wpkh" in n && "p2wpkhInP2sh" in n;
}

function bip49TabSelected() {
  return DOM.bip49tab.hasClass("active");
}

function bip84TabSelected() {
  return DOM.bip84tab.hasClass("active");
}

function bip141TabSelected() {
  return DOM.bip141tab.hasClass("active");
}

function setHdCoin(coinValue) {
  DOM.bip44coin.val(coinValue);
  DOM.bip49coin.val(coinValue);
  DOM.bip84coin.val(coinValue);
}

function showSegwitAvailable() {
  DOM.bip49unavailable.addClass("hidden");
  DOM.bip49available.removeClass("hidden");
  DOM.bip84unavailable.addClass("hidden");
  DOM.bip84available.removeClass("hidden");
  DOM.bip141unavailable.addClass("hidden");
  DOM.bip141available.removeClass("hidden");
}

function showSegwitUnavailable() {
  DOM.bip49available.addClass("hidden");
  DOM.bip49unavailable.removeClass("hidden");
  DOM.bip84available.addClass("hidden");
  DOM.bip84unavailable.removeClass("hidden");
  DOM.bip141available.addClass("hidden");
  DOM.bip141unavailable.removeClass("hidden");
}

function adjustNetworkForSegwit() {
  // If segwit is selected the xpub/xprv prefixes need to be adjusted
  // to avoid accidentally importing BIP49 xpub to BIP44 watch only
  // wallet.
  // See https://github.com/iancoleman/bip39/issues/125
  const segwitNetworks = null;
  // if a segwit network is alread selected, need to use base network to
  // look up new parameters
  if ("baseNetwork" in network) {
    network = libs.bitcoin.networks[network.baseNetwork];
  }
  // choose the right segwit params
  if (p2wpkhSelected() && "p2wpkh" in network) {
    network = network.p2wpkh;
  } else if (p2wpkhInP2shSelected() && "p2wpkhInP2sh" in network) {
    network = network.p2wpkhInP2sh;
  } else if (p2wshSelected() && "p2wsh" in network) {
    network = network.p2wsh;
  } else if (p2wshInP2shSelected() && "p2wshInP2sh" in network) {
    network = network.p2wshInP2sh;
  }
}

function lastIndexInTable() {
  const pathText = DOM.addresses.find(".index").last().text();
  const pathBits = pathText.split("/");
  const lastBit = pathBits[pathBits.length - 1];
  const lastBitClean = lastBit.replace("'", "");
  return parseInt(lastBitClean);
}

function uint8ArrayToHex(a) {
  const s = "";
  for (const i = 0; i < a.length; i++) {
    const h = a[i].toString(16);
    while (h.length < 2) {
      h = "0" + h;
    }
    s = s + h;
  }
  return s;
}

function showWordIndexes() {
  const phrase = DOM.phrase.val();
  const words = phraseToWordArray(phrase);
  const wordIndexes = [];
  const language = getLanguage();
  for (const i = 0; i < words.length; i++) {
    const word = words[i];
    const wordIndex = WORDLISTS[language].indexOf(word);
    wordIndexes.push(wordIndex);
  }
  const wordIndexesStr = wordIndexes.join(", ");
  DOM.entropyWordIndexes.text(wordIndexesStr);
}

function showChecksum() {
  const phrase = DOM.phrase.val();
  const words = phraseToWordArray(phrase);
  const checksumBitlength = words.length / 3;
  const checksum = "";
  const binaryStr = "";
  const language = getLanguage();
  for (const i = words.length - 1; i >= 0; i--) {
    const word = words[i];
    const wordIndex = WORDLISTS[language].indexOf(word);
    const wordBinary = wordIndex.toString(2);
    while (wordBinary.length < 11) {
      wordBinary = "0" + wordBinary;
    }
    const binaryStr = wordBinary + binaryStr;
    if (binaryStr.length >= checksumBitlength) {
      const start = binaryStr.length - checksumBitlength;
      const end = binaryStr.length;
      checksum = binaryStr.substring(start, end);
      // add spaces so the last group is 11 bits, not the first
      checksum = checksum.split("").reverse().join("");
      checksum = addSpacesEveryElevenBits(checksum);
      checksum = checksum.split("").reverse().join("");
      break;
    }
  }
  DOM.entropyChecksum.text(checksum);
}

function updateCsv() {
  const tableCsv = "path,address,public key,private key\n";
  const rows = DOM.addresses.find("tr");
  for (const i = 0; i < rows.length; i++) {
    const row = $(rows[i]);
    const cells = row.find("td");
    for (const j = 0; j < cells.length; j++) {
      const cell = $(cells[j]);
      if (!cell.children().hasClass("invisible")) {
        tableCsv = tableCsv + cell.text();
      }
      if (j != cells.length - 1) {
        tableCsv = tableCsv + ",";
      }
    }
    tableCsv = tableCsv + "\n";
  }
  DOM.csv.val(tableCsv);
}

function addSpacesEveryElevenBits(binaryStr) {
  return binaryStr.match(/.{1,11}/g).join(" ");
}

const networks = [
  {
    name: "AC - Asiacoin",
    onSelect: function () {
      network = libs.bitcoin.networks.asiacoin;
      setHdCoin(51);
    },
  },
  {
    name: "ACC - Adcoin",
    onSelect: function () {
      network = libs.bitcoin.networks.adcoin;
      setHdCoin(161);
    },
  },
  {
    name: "AGM - Argoneum",
    onSelect: function () {
      network = libs.bitcoin.networks.argoneum;
      setHdCoin(421);
    },
  },
  {
    name: "ARYA - Aryacoin",
    onSelect: function () {
      network = libs.bitcoin.networks.aryacoin;
      setHdCoin(357);
    },
  },
  {
    name: "ATOM - Cosmos Hub",
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoin;
      setHdCoin(118);
    },
  },
  {
    name: "AUR - Auroracoin",
    onSelect: function () {
      network = libs.bitcoin.networks.auroracoin;
      setHdCoin(85);
    },
  },
  {
    name: "AXE - Axe",
    onSelect: function () {
      network = libs.bitcoin.networks.axe;
      setHdCoin(4242);
    },
  },
  {
    name: "ANON - ANON",
    onSelect: function () {
      network = libs.bitcoin.networks.anon;
      setHdCoin(220);
    },
  },
  {
    name: "BOLI - Boliconstcoin",
    onSelect: function () {
      network = libs.bitcoin.networks.boliconstcoin;
      setHdCoin(278);
    },
  },
  {
    name: "BCA - Bitcoin Atom",
    onSelect: function () {
      network = libs.bitcoin.networks.atom;
      setHdCoin(185);
    },
  },
  {
    name: "BCH - Bitcoin Cash",
    onSelect: function () {
      DOM.bitcoinCashAddressTypeContainer.removeClass("hidden");
      setHdCoin(145);
    },
  },
  {
    name: "BEET - Beetlecoin",
    onSelect: function () {
      network = libs.bitcoin.networks.beetlecoin;
      setHdCoin(800);
    },
  },
  {
    name: "BELA - Belacoin",
    onSelect: function () {
      network = libs.bitcoin.networks.belacoin;
      setHdCoin(73);
    },
  },
  {
    name: "BLK - BlackCoin",
    onSelect: function () {
      network = libs.bitcoin.networks.blackcoin;
      setHdCoin(10);
    },
  },
  {
    name: "BND - Blocknode",
    onSelect: function () {
      network = libs.bitcoin.networks.blocknode;
      setHdCoin(2941);
    },
  },
  {
    name: "tBND - Blocknode Testnet",
    onSelect: function () {
      network = libs.bitcoin.networks.blocknode_testnet;
      setHdCoin(1);
    },
  },
  {
    name: "BRIT - Britcoin",
    onSelect: function () {
      network = libs.bitcoin.networks.britcoin;
      setHdCoin(70);
    },
  },
  {
    name: "BSD - Bitsend",
    onSelect: function () {
      network = libs.bitcoin.networks.bitsend;
      setHdCoin(91);
    },
  },
  {
    name: "BST - BlockStamp",
    onSelect: function () {
      network = libs.bitcoin.networks.blockstamp;
      setHdCoin(254);
    },
  },
  {
    name: "BTA - Bata",
    onSelect: function () {
      network = libs.bitcoin.networks.bata;
      setHdCoin(89);
    },
  },
  {
    name: "BTC - Bitcoin",
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoin;
      setHdCoin(0);
    },
  },
  {
    name: "BTC - Bitcoin RegTest",
    onSelect: function () {
      network = libs.bitcoin.networks.regtest;
      // Using hd coin value 1 based on bip44_coin_type
      // https://github.com/chaintope/bitcoinrb/blob/f1014406f6b8f9b4edcecedc18df70c80df06f11/lib/bitcoin/chainparams/regtest.yml
      setHdCoin(1);
    },
  },
  {
    name: "BTC - Bitcoin Testnet",
    onSelect: function () {
      network = libs.bitcoin.networks.testnet;
      setHdCoin(1);
    },
  },
  {
    name: "BITG - Bitcoin Green",
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoingreen;
      setHdCoin(222);
    },
  },
  {
    name: "BTCP - Bitcoin Private",
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoinprivate;
      setHdCoin(183);
    },
  },
  {
    name: "BTCPt - Bitcoin Private Testnet",
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoinprivatetestnet;
      setHdCoin(1);
    },
  },
  {
    name: "BSC - Binance Smart Chain",
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoin;
      setHdCoin(60);
    },
  },
  {
    name: "BSV - BitcoinSV",
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoinsv;
      setHdCoin(236);
    },
  },
  {
    name: "BTCZ - Bitcoinz",
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoinz;
      setHdCoin(177);
    },
  },
  {
    name: "BTDX - BitCloud",
    onSelect: function () {
      network = libs.bitcoin.networks.bitcloud;
      setHdCoin(218);
    },
  },
  {
    name: "BTG - Bitcoin Gold",
    onSelect: function () {
      network = libs.bitcoin.networks.bgold;
      setHdCoin(156);
    },
  },
  {
    name: "BTX - Bitcore",
    onSelect: function () {
      network = libs.bitcoin.networks.bitcore;
      setHdCoin(160);
    },
  },
  {
    name: "CCN - Cannacoin",
    onSelect: function () {
      network = libs.bitcoin.networks.cannacoin;
      setHdCoin(19);
    },
  },
  {
    name: "CESC - Cryptoescudo",
    onSelect: function () {
      network = libs.bitcoin.networks.cannacoin;
      setHdCoin(111);
    },
  },
  {
    name: "CDN - Canadaecoin",
    onSelect: function () {
      network = libs.bitcoin.networks.canadaecoin;
      setHdCoin(34);
    },
  },
  {
    name: "CLAM - Clams",
    onSelect: function () {
      network = libs.bitcoin.networks.clam;
      setHdCoin(23);
    },
  },
  {
    name: "CLO - Callisto",
    segwitAvailable: false,
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoin;
      setHdCoin(820);
    },
  },
  {
    name: "CLUB - Clubcoin",
    onSelect: function () {
      network = libs.bitcoin.networks.clubcoin;
      setHdCoin(79);
    },
  },
  {
    name: "CMP - Compcoin",
    onSelect: function () {
      network = libs.bitcoin.networks.compcoin;
      setHdCoin(71);
    },
  },
  {
    name: "CPU - CPUchain",
    onSelect: function () {
      network = libs.bitcoin.networks.cpuchain;
      setHdCoin(363);
    },
  },
  {
    name: "CRAVE - Crave",
    onSelect: function () {
      network = libs.bitcoin.networks.crave;
      setHdCoin(186);
    },
  },
  {
    name: "CRP - CranePay",
    onSelect: function () {
      network = libs.bitcoin.networks.cranepay;
      setHdCoin(2304);
    },
  },

  {
    name: "CRW - Crown (Legacy)",
    onSelect: function () {
      network = libs.bitcoin.networks.crown;
      setHdCoin(72);
    },
  },
  {
    name: "CRW - Crown",
    onSelect: function () {
      network = libs.bitcoin.networks.crown;
      setHdCoin(72);
    },
  },
  {
    name: "CSC - CasinoCoin",
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoin;
      setHdCoin(359);
    },
  },
  {
    name: "DASH - Dash",
    onSelect: function () {
      network = libs.bitcoin.networks.dash;
      setHdCoin(5);
    },
  },
  {
    name: "DASH - Dash Testnet",
    onSelect: function () {
      network = libs.bitcoin.networks.dashtn;
      setHdCoin(1);
    },
  },
  {
    name: "DFC - Defcoin",
    onSelect: function () {
      network = libs.bitcoin.networks.defcoin;
      setHdCoin(1337);
    },
  },
  {
    name: "DGB - Digibyte",
    onSelect: function () {
      network = libs.bitcoin.networks.digibyte;
      setHdCoin(20);
    },
  },
  {
    name: "DGC - Digitalcoin",
    onSelect: function () {
      network = libs.bitcoin.networks.digitalcoin;
      setHdCoin(18);
    },
  },
  {
    name: "DIVI - DIVI",
    onSelect: function () {
      network = libs.bitcoin.networks.divi;
      setHdCoin(301);
    },
  },
  {
    name: "DIVI - DIVI Testnet",
    onSelect: function () {
      network = libs.bitcoin.networks.divitestnet;
      setHdCoin(1);
    },
  },
  {
    name: "DMD - Diamond",
    onSelect: function () {
      network = libs.bitcoin.networks.diamond;
      setHdCoin(152);
    },
  },
  {
    name: "DNR - Denarius",
    onSelect: function () {
      network = libs.bitcoin.networks.denarius;
      setHdCoin(116);
    },
  },
  {
    name: "DOGE - Dogecoin",
    onSelect: function () {
      network = libs.bitcoin.networks.dogecoin;
      setHdCoin(3);
    },
  },
  {
    name: "DOGEt - Dogecoin Testnet",
    onSelect: function () {
      network = libs.bitcoin.networks.dogecointestnet;
      setHdCoin(1);
    },
  },
  {
    name: "DXN - DEXON",
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoin;
      setHdCoin(237);
    },
  },
  {
    name: "ECN - Ecoin",
    onSelect: function () {
      network = libs.bitcoin.networks.ecoin;
      setHdCoin(115);
    },
  },
  {
    name: "EDRC - Edrcoin",
    onSelect: function () {
      network = libs.bitcoin.networks.edrcoin;
      setHdCoin(56);
    },
  },
  {
    name: "EFL - Egulden",
    onSelect: function () {
      network = libs.bitcoin.networks.egulden;
      setHdCoin(78);
    },
  },
  {
    name: "ELA - Elastos",
    onSelect: function () {
      network = libs.bitcoin.networks.elastos;
      setHdCoin(2305);
    },
  },
  {
    name: "ELLA - Ellaism",
    segwitAvailable: false,
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoin;
      setHdCoin(163);
    },
  },
  {
    name: "EMC2 - Einsteinium",
    onSelect: function () {
      network = libs.bitcoin.networks.einsteinium;
      setHdCoin(41);
    },
  },
  {
    name: "ERC - Europecoin",
    onSelect: function () {
      network = libs.bitcoin.networks.europecoin;
      setHdCoin(151);
    },
  },
  {
    name: "EOS - EOSIO",
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoin;
      setHdCoin(194);
    },
  },
  {
    name: "ERE - EtherCore",
    segwitAvailable: false,
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoin;
      setHdCoin(466);
    },
  },
  {
    name: "ESN - Ethersocial Network",
    segwitAvailable: false,
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoin;
      setHdCoin(31102);
    },
  },
  {
    name: "ETC - Ethereum Classic",
    segwitAvailable: false,
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoin;
      setHdCoin(61);
    },
  },
  {
    name: "ETH - Ethereum",
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoin;
      setHdCoin(60);
    },
  },
  {
    name: "EWT - EnergyWeb",
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoin;
      setHdCoin(246);
    },
  },
  {
    name: "EXCL - Exclusivecoin",
    onSelect: function () {
      network = libs.bitcoin.networks.exclusivecoin;
      setHdCoin(190);
    },
  },
  {
    name: "EXCC - ExchangeCoin",
    onSelect: function () {
      network = libs.bitcoin.networks.exchangecoin;
      setHdCoin(0);
    },
  },
  {
    name: "EXP - Expanse",
    segwitAvailable: false,
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoin;
      setHdCoin(40);
    },
  },
  {
    name: "FIO - Foundation for Interwallet Operability",
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoin;
      setHdCoin(235);
    },
  },
  {
    name: "FIRO - Firo (Zcoin rebrand)",
    onSelect: function () {
      network = libs.bitcoin.networks.firo;
      setHdCoin(136);
    },
  },
  {
    name: "FIX - FIX",
    onSelect: function () {
      network = libs.bitcoin.networks.fix;
      setHdCoin(336);
    },
  },
  {
    name: "FIX - FIX Testnet",
    onSelect: function () {
      network = libs.bitcoin.networks.fixtestnet;
      setHdCoin(1);
    },
  },
  {
    name: "FJC - Fujicoin",
    onSelect: function () {
      network = libs.bitcoin.networks.fujicoin;
      setHdCoin(75);
    },
  },
  {
    name: "FLASH - Flashcoin",
    onSelect: function () {
      network = libs.bitcoin.networks.flashcoin;
      setHdCoin(120);
    },
  },
  {
    name: "FRST - Firstcoin",
    onSelect: function () {
      network = libs.bitcoin.networks.firstcoin;
      setHdCoin(167);
    },
  },
  {
    name: "FTC - Feathercoin",
    onSelect: function () {
      network = libs.bitcoin.networks.feathercoin;
      setHdCoin(8);
    },
  },
  {
    name: "GAME - GameCredits",
    onSelect: function () {
      network = libs.bitcoin.networks.game;
      setHdCoin(101);
    },
  },
  {
    name: "GBX - Gobyte",
    onSelect: function () {
      network = libs.bitcoin.networks.gobyte;
      setHdCoin(176);
    },
  },
  {
    name: "GCR - GCRCoin",
    onSelect: function () {
      network = libs.bitcoin.networks.gcr;
      setHdCoin(79);
    },
  },
  {
    name: "GRC - Gridcoin",
    onSelect: function () {
      network = libs.bitcoin.networks.gridcoin;
      setHdCoin(84);
    },
  },
  {
    name: "GRS - Groestlcoin",
    onSelect: function () {
      network = libs.bitcoin.networks.groestlcoin;
      setHdCoin(17);
    },
  },
  {
    name: "GRS - Groestlcoin Testnet",
    onSelect: function () {
      network = libs.bitcoin.networks.groestlcointestnet;
      setHdCoin(1);
    },
  },
  {
    name: "HNS - Handshake",
    onSelect: function () {
      setHdCoin(5353);
    },
  },
  {
    name: "HNC - Helleniccoin",
    onSelect: function () {
      network = libs.bitcoin.networks.helleniccoin;
      setHdCoin(168);
    },
  },
  {
    name: "HUSH - Hush (Legacy)",
    onSelect: function () {
      network = libs.bitcoin.networks.hush;
      setHdCoin(197);
    },
  },
  {
    name: "HUSH - Hush3",
    onSelect: function () {
      network = libs.bitcoin.networks.hush3;
      setHdCoin(197);
    },
  },
  {
    name: "INSN - Insane",
    onSelect: function () {
      network = libs.bitcoin.networks.insane;
      setHdCoin(68);
    },
  },
  {
    name: "IOP - Iop",
    onSelect: function () {
      network = libs.bitcoin.networks.iop;
      setHdCoin(66);
    },
  },
  {
    name: "IOV - Starname",
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoin;
      setHdCoin(234);
    },
  },
  {
    name: "IXC - Ixcoin",
    onSelect: function () {
      network = libs.bitcoin.networks.ixcoin;
      setHdCoin(86);
    },
  },
  {
    name: "JBS - Jumbucks",
    onSelect: function () {
      network = libs.bitcoin.networks.jumbucks;
      setHdCoin(26);
    },
  },
  {
    name: "KMD - Komodo",
    bip49available: false,
    onSelect: function () {
      network = libs.bitcoin.networks.komodo;
      setHdCoin(141);
    },
  },
  {
    name: "KOBO - Kobocoin",
    bip49available: false,
    onSelect: function () {
      network = libs.bitcoin.networks.kobocoin;
      setHdCoin(196);
    },
  },
  {
    name: "LBC - Library Credits",
    onSelect: function () {
      network = libs.bitcoin.networks.lbry;
      setHdCoin(140);
    },
  },
  {
    name: "LCC - Litecoincash",
    onSelect: function () {
      network = libs.bitcoin.networks.litecoincash;
      setHdCoin(192);
    },
  },
  {
    name: "LDCN - Landcoin",
    onSelect: function () {
      network = libs.bitcoin.networks.landcoin;
      setHdCoin(63);
    },
  },
  {
    name: "LINX - Linx",
    onSelect: function () {
      network = libs.bitcoin.networks.linx;
      setHdCoin(114);
    },
  },
  {
    name: "LKR - Lkrcoin",
    segwitAvailable: false,
    onSelect: function () {
      network = libs.bitcoin.networks.lkrcoin;
      setHdCoin(557);
    },
  },
  {
    name: "LTC - Litecoin",
    onSelect: function () {
      network = libs.bitcoin.networks.litecoin;
      setHdCoin(2);
      DOM.litecoinLtubContainer.removeClass("hidden");
    },
  },
  {
    name: "LTCt - Litecoin Testnet",
    onSelect: function () {
      network = libs.bitcoin.networks.litecointestnet;
      setHdCoin(1);
      DOM.litecoinLtubContainer.removeClass("hidden");
    },
  },
  {
    name: "LTZ - LitecoinZ",
    onSelect: function () {
      network = libs.bitcoin.networks.litecoinz;
      setHdCoin(221);
    },
  },
  {
    name: "LUNA - Terra",
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoin;
      setHdCoin(330);
    },
  },
  {
    name: "LYNX - Lynx",
    onSelect: function () {
      network = libs.bitcoin.networks.lynx;
      setHdCoin(191);
    },
  },
  {
    name: "MAZA - Maza",
    onSelect: function () {
      network = libs.bitcoin.networks.maza;
      setHdCoin(13);
    },
  },
  {
    name: "MEC - Megacoin",
    onSelect: function () {
      network = libs.bitcoin.networks.megacoin;
      setHdCoin(217);
    },
  },
  {
    name: "MIX - MIX",
    segwitAvailable: false,
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoin;
      setHdCoin(76);
    },
  },
  {
    name: "MNX - Minexcoin",
    onSelect: function () {
      network = libs.bitcoin.networks.minexcoin;
      setHdCoin(182);
    },
  },
  {
    name: "MONA - Monacoin",
    onSelect: function () {
      (network = libs.bitcoin.networks.monacoin), setHdCoin(22);
    },
  },
  {
    name: "MONK - Monkey Project",
    onSelect: function () {
      (network = libs.bitcoin.networks.monkeyproject), setHdCoin(214);
    },
  },
  {
    name: "MOAC - MOAC",
    segwitAvailable: false,
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoin;
      setHdCoin(314);
    },
  },
  {
    name: "MUSIC - Musicoin",
    segwitAvailable: false,
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoin;
      setHdCoin(184);
    },
  },
  {
    name: "NANO - Nano",
    onSelect: function () {
      network = network = libs.nanoUtil.dummyNetwork;
      setHdCoin(165);
    },
  },
  {
    name: "NAV - Navcoin",
    onSelect: function () {
      network = libs.bitcoin.networks.navcoin;
      setHdCoin(130);
    },
  },
  {
    name: "NAS - Nebulas",
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoin;
      setHdCoin(2718);
    },
  },
  {
    name: "NEBL - Neblio",
    onSelect: function () {
      network = libs.bitcoin.networks.neblio;
      setHdCoin(146);
    },
  },
  {
    name: "NEOS - Neoscoin",
    onSelect: function () {
      network = libs.bitcoin.networks.neoscoin;
      setHdCoin(25);
    },
  },
  {
    name: "NIX - NIX Platform",
    onSelect: function () {
      network = libs.bitcoin.networks.nix;
      setHdCoin(400);
    },
  },
  {
    name: "NLG - Gulden",
    onSelect: function () {
      network = libs.bitcoin.networks.gulden;
      setHdCoin(87);
    },
  },
  {
    name: "NMC - Namecoin",
    onSelect: function () {
      network = libs.bitcoin.networks.namecoin;
      setHdCoin(7);
    },
  },
  {
    name: "NRG - Energi",
    onSelect: function () {
      network = libs.bitcoin.networks.energi;
      setHdCoin(204);
    },
  },
  {
    name: "NRO - Neurocoin",
    onSelect: function () {
      network = libs.bitcoin.networks.neurocoin;
      setHdCoin(110);
    },
  },
  {
    name: "NSR - Nushares",
    onSelect: function () {
      network = libs.bitcoin.networks.nushares;
      setHdCoin(11);
    },
  },
  {
    name: "NYC - Newyorkc",
    onSelect: function () {
      network = libs.bitcoin.networks.newyorkc;
      setHdCoin(179);
    },
  },
  {
    name: "NVC - Novacoin",
    onSelect: function () {
      network = libs.bitcoin.networks.novacoin;
      setHdCoin(50);
    },
  },
  {
    name: "OK - Okcash",
    onSelect: function () {
      network = libs.bitcoin.networks.okcash;
      setHdCoin(69);
    },
  },
  {
    name: "OMNI - Omnicore",
    onSelect: function () {
      network = libs.bitcoin.networks.omnicore;
      setHdCoin(200);
    },
  },
  {
    name: "ONION - DeepOnion",
    onSelect: function () {
      network = libs.bitcoin.networks.deeponion;
      setHdCoin(305);
    },
  },
  {
    name: "ONX - Onixcoin",
    onSelect: function () {
      network = libs.bitcoin.networks.onixcoin;
      setHdCoin(174);
    },
  },
  {
    name: "PART - Particl",
    onSelect: function () {
      network = libs.bitcoin.networks.particl;
      setHdCoin(44);
    },
  },
  {
    name: "PHR - Phore",
    onSelect: function () {
      network = libs.bitcoin.networks.phore;
      setHdCoin(444);
    },
  },
  {
    name: "PINK - Pinkcoin",
    onSelect: function () {
      network = libs.bitcoin.networks.pinkcoin;
      setHdCoin(117);
    },
  },
  {
    name: "PIRL - Pirl",
    segwitAvailable: false,
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoin;
      setHdCoin(164);
    },
  },
  {
    name: "PIVX - PIVX",
    onSelect: function () {
      network = libs.bitcoin.networks.pivx;
      setHdCoin(119);
    },
  },
  {
    name: "PIVX - PIVX Testnet",
    onSelect: function () {
      network = libs.bitcoin.networks.pivxtestnet;
      setHdCoin(1);
    },
  },
  {
    name: "POA - Poa",
    segwitAvailable: false,
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoin;
      setHdCoin(178);
    },
  },
  {
    name: "POSW - POSWcoin",
    onSelect: function () {
      network = libs.bitcoin.networks.poswcoin;
      setHdCoin(47);
    },
  },
  {
    name: "POT - Potcoin",
    onSelect: function () {
      network = libs.bitcoin.networks.potcoin;
      setHdCoin(81);
    },
  },
  {
    name: "PPC - Peercoin",
    onSelect: function () {
      network = libs.bitcoin.networks.peercoin;
      setHdCoin(6);
    },
  },
  {
    name: "PRJ - ProjectCoin",
    onSelect: function () {
      network = libs.bitcoin.networks.projectcoin;
      setHdCoin(533);
    },
  },
  {
    name: "PSB - Pesobit",
    onSelect: function () {
      network = libs.bitcoin.networks.pesobit;
      setHdCoin(62);
    },
  },
  {
    name: "PUT - Putincoin",
    onSelect: function () {
      network = libs.bitcoin.networks.putincoin;
      setHdCoin(122);
    },
  },
  {
    name: "RPD - Rapids",
    onSelect: function () {
      network = libs.bitcoin.networks.rapids;
      setHdCoin(320);
    },
  },
  {
    name: "RVN - Ravencoin",
    onSelect: function () {
      network = libs.bitcoin.networks.ravencoin;
      setHdCoin(175);
    },
  },
  {
    name: "R-BTC - RSK",
    onSelect: function () {
      network = libs.bitcoin.networks.rsk;
      setHdCoin(137);
    },
  },
  {
    name: "tR-BTC - RSK Testnet",
    onSelect: function () {
      network = libs.bitcoin.networks.rsktestnet;
      setHdCoin(37310);
    },
  },
  {
    name: "RBY - Rubycoin",
    onSelect: function () {
      network = libs.bitcoin.networks.rubycoin;
      setHdCoin(16);
    },
  },
  {
    name: "RDD - Reddcoin",
    onSelect: function () {
      network = libs.bitcoin.networks.reddcoin;
      setHdCoin(4);
    },
  },
  {
    name: "RITO - Ritocoin",
    onSelect: function () {
      network = libs.bitcoin.networks.ritocoin;
      setHdCoin(19169);
    },
  },
  {
    name: "RUNE - THORChain",
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoin;
      setHdCoin(931);
    },
  },
  {
    name: "RVR - RevolutionVR",
    onSelect: function () {
      network = libs.bitcoin.networks.revolutionvr;
      setHdCoin(129);
    },
  },
  {
    name: "SAFE - Safecoin",
    onSelect: function () {
      network = libs.bitcoin.networks.safecoin;
      setHdCoin(19165);
    },
  },
  {
    name: "SCRIBE - Scribe",
    onSelect: function () {
      network = libs.bitcoin.networks.scribe;
      setHdCoin(545);
    },
  },
  {
    name: "SLS - Salus",
    onSelect: function () {
      network = libs.bitcoin.networks.salus;
      setHdCoin(63);
    },
  },
  {
    name: "SDC - ShadowCash",
    onSelect: function () {
      network = libs.bitcoin.networks.shadow;
      setHdCoin(35);
    },
  },
  {
    name: "SDC - ShadowCash Testnet",
    onSelect: function () {
      network = libs.bitcoin.networks.shadowtn;
      setHdCoin(1);
    },
  },
  {
    name: "SLM - Slimcoin",
    onSelect: function () {
      network = libs.bitcoin.networks.slimcoin;
      setHdCoin(63);
    },
  },
  {
    name: "SLM - Slimcoin Testnet",
    onSelect: function () {
      network = libs.bitcoin.networks.slimcointn;
      setHdCoin(111);
    },
  },
  {
    name: "SLP - Simple Ledger Protocol",
    onSelect: function () {
      DOM.bitcoinCashAddressTypeContainer.removeClass("hidden");
      setHdCoin(245);
    },
  },
  {
    name: "SLR - Solarcoin",
    onSelect: function () {
      network = libs.bitcoin.networks.solarcoin;
      setHdCoin(58);
    },
  },
  {
    name: "SMLY - Smileycoin",
    onSelect: function () {
      network = libs.bitcoin.networks.smileycoin;
      setHdCoin(59);
    },
  },
  {
    name: "STASH - Stash",
    onSelect: function () {
      network = libs.bitcoin.networks.stash;
      setHdCoin(0xc0c0);
    },
  },
  {
    name: "STASH - Stash Testnet",
    onSelect: function () {
      network = libs.bitcoin.networks.stashtn;
      setHdCoin(0xcafe);
    },
  },
  {
    name: "STRAT - Stratis",
    onSelect: function () {
      network = libs.bitcoin.networks.stratis;
      setHdCoin(105);
    },
  },
  {
    name: "SUGAR - Sugarchain",
    onSelect: function () {
      network = libs.bitcoin.networks.sugarchain;
      setHdCoin(408);
    },
  },
  {
    name: "TUGAR - Sugarchain Testnet",
    onSelect: function () {
      network = libs.bitcoin.networks.sugarchaintestnet;
      setHdCoin(408);
    },
  },
  {
    name: "SWTC - Jingtum",
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoin;
      setHdCoin(315);
    },
  },
  {
    name: "TSTRAT - Stratis Testnet",
    onSelect: function () {
      network = libs.bitcoin.networks.stratistest;
      setHdCoin(105);
    },
  },
  {
    name: "SYS - Syscoin",
    onSelect: function () {
      network = libs.bitcoin.networks.syscoin;
      setHdCoin(57);
    },
  },
  {
    name: "THC - Hempcoin",
    onSelect: function () {
      network = libs.bitcoin.networks.hempcoin;
      setHdCoin(113);
    },
  },
  {
    name: "THT - Thought",
    onSelect: function () {
      network = libs.bitcoin.networks.thought;
      setHdCoin(1618);
    },
  },
  {
    name: "TOA - Toa",
    onSelect: function () {
      network = libs.bitcoin.networks.toa;
      setHdCoin(159);
    },
  },
  {
    name: "TRX - Tron",
    onSelect: function () {
      setHdCoin(195);
    },
  },
  {
    name: "TWINS - TWINS",
    onSelect: function () {
      network = libs.bitcoin.networks.twins;
      setHdCoin(970);
    },
  },
  {
    name: "TWINS - TWINS Testnet",
    onSelect: function () {
      network = libs.bitcoin.networks.twinstestnet;
      setHdCoin(1);
    },
  },
  {
    name: "USC - Ultimatesecurecash",
    onSelect: function () {
      network = libs.bitcoin.networks.ultimatesecurecash;
      setHdCoin(112);
    },
  },
  {
    name: "USNBT - NuBits",
    onSelect: function () {
      network = libs.bitcoin.networks.nubits;
      setHdCoin(12);
    },
  },
  {
    name: "UNO - Unobtanium",
    onSelect: function () {
      network = libs.bitcoin.networks.unobtanium;
      setHdCoin(92);
    },
  },
  {
    name: "VASH - Vpncoin",
    onSelect: function () {
      network = libs.bitcoin.networks.vpncoin;
      setHdCoin(33);
    },
  },
  {
    name: "VET - VeChain",
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoin;
      setHdCoin(818);
    },
  },
  {
    name: "VIA - Viacoin",
    onSelect: function () {
      network = libs.bitcoin.networks.viacoin;
      setHdCoin(14);
    },
  },
  {
    name: "VIA - Viacoin Testnet",
    onSelect: function () {
      network = libs.bitcoin.networks.viacointestnet;
      setHdCoin(1);
    },
  },
  {
    name: "VIVO - Vivo",
    onSelect: function () {
      network = libs.bitcoin.networks.vivo;
      setHdCoin(166);
    },
  },
  {
    name: "VTC - Vertcoin",
    onSelect: function () {
      network = libs.bitcoin.networks.vertcoin;
      setHdCoin(28);
    },
  },
  {
    name: "WGR - Wagerr",
    onSelect: function () {
      network = libs.bitcoin.networks.wagerr;
      setHdCoin(7825266);
    },
  },
  {
    name: "WC - Wincoin",
    onSelect: function () {
      network = libs.bitcoin.networks.wincoin;
      setHdCoin(181);
    },
  },
  {
    name: "XAX - Artax",
    onSelect: function () {
      network = libs.bitcoin.networks.artax;
      setHdCoin(219);
    },
  },
  {
    name: "XBC - Bitcoinplus",
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoinplus;
      setHdCoin(65);
    },
  },
  {
    name: "XLM - Stellar",
    onSelect: function () {
      network = libs.stellarUtil.dummyNetwork;
      setHdCoin(148);
    },
  },
  {
    name: "XMY - Myriadcoin",
    onSelect: function () {
      network = libs.bitcoin.networks.myriadcoin;
      setHdCoin(90);
    },
  },
  {
    name: "XRP - Ripple",
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoin;
      setHdCoin(144);
    },
  },
  {
    name: "XVC - Vcash",
    onSelect: function () {
      network = libs.bitcoin.networks.vcash;
      setHdCoin(127);
    },
  },
  {
    name: "XVG - Verge",
    onSelect: function () {
      network = libs.bitcoin.networks.verge;
      setHdCoin(77);
    },
  },
  {
    name: "XUEZ - Xuez",
    segwitAvailable: false,
    onSelect: function () {
      network = libs.bitcoin.networks.xuez;
      setHdCoin(225);
    },
  },
  {
    name: "XWCC - Whitecoin Classic",
    onSelect: function () {
      network = libs.bitcoin.networks.whitecoin;
      setHdCoin(155);
    },
  },
  {
    name: "XZC - Zcoin (rebranded to Firo)",
    onSelect: function () {
      network = libs.bitcoin.networks.zcoin;
      setHdCoin(136);
    },
  },
  {
    name: "ZBC - ZooBlockchain",
    onSelect: function () {
      network = libs.bitcoin.networks.zoobc;
      setHdCoin(883);
    },
  },
  {
    name: "ZCL - Zclassic",
    onSelect: function () {
      network = libs.bitcoin.networks.zclassic;
      setHdCoin(147);
    },
  },
  {
    name: "ZEC - Zcash",
    onSelect: function () {
      network = libs.bitcoin.networks.zcash;
      setHdCoin(133);
    },
  },
  {
    name: "ZEN - Horizen",
    onSelect: function () {
      network = libs.bitcoin.networks.zencash;
      setHdCoin(121);
    },
  },
  {
    name: "XWC - Whitecoin",
    onSelect: function () {
      network = libs.bitcoin.networks.bitcoin;
      setHdCoin(559);
    },
  },
];

const clients = [
  {
    name: "Bitcoin Core",
    onSelect: function () {
      DOM.bip32path.val("m/0'/0'");
      DOM.hardenedAddresses.prop("checked", true);
    },
  },
  {
    name: "blockchain.info",
    onSelect: function () {
      DOM.bip32path.val("m/44'/0'/0'");
      DOM.hardenedAddresses.prop("checked", false);
    },
  },
  {
    name: "MultiBit HD",
    onSelect: function () {
      DOM.bip32path.val("m/0'/0");
      DOM.hardenedAddresses.prop("checked", false);
    },
  },
  {
    name: "Coinomi, Ledger",
    onSelect: function () {
      DOM.bip32path.val("m/44'/" + DOM.bip44coin.val() + "'/0'");
      DOM.hardenedAddresses.prop("checked", false);
    },
  },
];

// RSK - RSK functions - begin
function stripHexPrefix(address) {
  if (typeof address !== "string") {
    throw new Error("address parameter should be a string.");
  }

  const hasPrefix = address.substring(0, 2) === "0x" || address.substring(0, 2) === "0X";

  return hasPrefix ? address.slice(2) : address;
}

function toChecksumAddressForRsk(address, chainId = null) {
  if (typeof address !== "string") {
    throw new Error("address parameter should be a string.");
  }

  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    throw new Error("Given address is not a valid RSK address: " + address);
  }

  const stripAddress = stripHexPrefix(address).toLowerCase();
  const prefix = chainId != null ? chainId.toString() + "0x" : "";
  const keccakHash = libs.ethUtil
    .keccak256(prefix + stripAddress)
    .toString("hex")
    .replace(/^0x/i, "");
  const checksumAddress = "0x";

  for (const i = 0; i < stripAddress.length; i++) {
    checksumAddress +=
      parseInt(keccakHash[i], 16) >= 8 ? stripAddress[i].toUpperCase() : stripAddress[i];
  }

  return checksumAddress;
}

// RSK - RSK functions - end

// ELA - Elastos functions - begin
function displayBip44InfoForELA() {
  if (!isELA()) {
    return;
  }

  const coin = parseIntNoNaN(DOM.bip44coin.val(), 0);
  const account = parseIntNoNaN(DOM.bip44account.val(), 0);

  // Calculate the account extended keys
  const accountXprv = libs.elastosjs.getAccountExtendedPrivateKey(seed, coin, account);
  const accountXpub = libs.elastosjs.getAccountExtendedPublicKey(seed, coin, account);

  // Display the extended keys
  DOM.bip44accountXprv.val(accountXprv);
  DOM.bip44accountXpub.val(accountXpub);
}

function displayBip32InfoForELA() {
  if (!isELA()) {
    return;
  }

  const coin = parseIntNoNaN(DOM.bip44coin.val(), 0);
  const account = parseIntNoNaN(DOM.bip44account.val(), 0);
  const change = parseIntNoNaN(DOM.bip44change.val(), 0);

  DOM.extendedPrivKey.val(libs.elastosjs.getBip32ExtendedPrivateKey(seed, coin, account, change));
  DOM.extendedPubKey.val(libs.elastosjs.getBip32ExtendedPublicKey(seed, coin, account, change));

  // Display the addresses and privkeys
  clearAddressesList();
  const initialAddressCount = parseInt(DOM.rowsToAdd.val());
  displayAddresses(0, initialAddressCount);
}

function calcAddressForELA(seed, coin, account, change, index) {
  if (!isELA()) {
    return;
  }

  const publicKey = libs.elastosjs.getDerivedPublicKey(
    libs.elastosjs.getMasterPublicKey(seed),
    change,
    index
  );
  return {
    privateKey: libs.elastosjs.getDerivedPrivateKey(seed, coin, account, change, index),
    publicKey: publicKey,
    address: libs.elastosjs.getAddress(publicKey.toString("hex")),
  };
}
// ELA - Elastos functions - end

init();
