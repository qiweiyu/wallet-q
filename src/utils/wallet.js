import bip39 from 'bip39';
import bip32 from 'bip32';
import qtum from 'qtumjs-lib';
import bitcoin from 'bitcoinjs-lib';
import { aes256 } from './encrypt';
import secureStore from './secureStore';
import stores from 'src/stores';

const qtumNetwork = qtum.networks.qtum;

const getDefaultNetwork = () => {
  return qtumNetwork;
};

const getDefaultDerivePath = () => {
  return 'm/88\'/0\'/0\'';
};

const getAddress = (node, network) => {
  return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address;
};

const generateMnemonic = () => {
  return bip39.generateMnemonic();
};

const validateMnemonic = (mnemonic) => {
  return bip39.validateMnemonic(mnemonic);
};

const validateWif = (wif) => {
  try {
    bitcoin.ECPair.fromWIF(wif, getDefaultNetwork());
    return true;
  } catch (error) {
    return false;
  }
};

const checkLocalSavedWallet = async () => {
  const address = await stores.wallet.getAddress();
  const hasSaved = await secureStore.fetch(address);
  if (!hasSaved) {
    await destroyWallet();
    return false;
  }
  stores.wallet.fetchWalletInfo(address);
  return address;
};

const decryptLocalSavedWallet = async (password) => {
  const address = await stores.wallet.getAddress();
  const savedData = await secureStore.fetch(address);
  if (!savedData) {
    await Wallet.destroyWallet();
    return false;
  }
  const decryptedBody = aes256.decrypt(password, savedData);
  try {
    return JSON.parse(decryptedBody);
  } catch (error) {
    return false;
  }
};

const encryptAndSaveMnemonic = async (mnemonic, password, path, network) => {
  path = path || getDefaultDerivePath();
  network = network || getDefaultNetwork();
  const seed = bip39.mnemonicToSeed(mnemonic);
  const master = bip32.fromSeed(seed, network);
  const child = master.derivePath(path);
  const address = getAddress(child, network);
  const wif = child.toWIF();
  const saveBody = aes256.encrypt(password, JSON.stringify({
    address,
    mnemonic,
    wif,
    path,
    network,
  }));
  await Promise.all([secureStore.save(address, saveBody), stores.wallet.setAddress(address)]);
  return true;
};

const encryptAndSaveWif = async (wif, password, network) => {
  network = network || getDefaultNetwork();
  const keyPair = bitcoin.ECPair.fromWIF(wif);
  const address = getAddress(keyPair, network);
  const saveBody = aes256.encrypt(password, JSON.stringify({
    address,
    wif,
    network,
  }));
  await Promise.all([secureStore.save(address, saveBody), stores.wallet.setAddress(address)]);
  return true;
};

const destroyWallet = async () => {
  await Promise.all([secureStore.reset(), stores.wallet.delAddress()]);
};

const satPos = 8;
const changeUnitFromSatTo1 = (amountSat) => {
  return amountSat * 10 ** (-1 * satPos);
};
const changeUnitFrom1ToSat = (amount) => {
  return amount * 10 ** satPos;
};

export default {
  getDefaultNetwork,
  getDefaultDerivePath,
  getAddress,
  generateMnemonic,
  validateMnemonic,
  validateWif,
  checkLocalSavedWallet,
  decryptLocalSavedWallet,
  encryptAndSaveMnemonic,
  encryptAndSaveWif,
  changeUnitFromSatTo1,
  changeUnitFrom1ToSat,
};