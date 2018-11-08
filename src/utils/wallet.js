import bip39 from 'bip39';
import bip32 from 'bip32';
import qtum from 'qtumjs-lib';
import bitcoin from 'bitcoinjs-lib';
import { aes256 } from './encrypt';
import secureStore from './secureStore';
import stores from 'src/stores';

const qtumNetwork = qtum.networks.qtum;

export default class Wallet {
  static getDefaultNetwork() {
    return qtumNetwork;
  }

  static getDefaultDerivePath() {
    return 'm/88\'/0\'/0\'';
  }

  static getAddress(node, network) {
    return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address;
  }

  static generateMnemonic() {
    return bip39.generateMnemonic();
  }

  static validateMnemonic(mnemonic) {
    return bip39.validateMnemonic(mnemonic);
  }

  static validateWif(wif) {
    try {
      bitcoin.ECPair.fromWIF(wif, Wallet.getDefaultNetwork());
      return true;
    } catch (error) {
      return false;
    }
  }

  static async checkLocalSavedWallet() {
    const address = await stores.wallet.getAddress();
    const hasSaved = await secureStore.fetch(address);
    if (!hasSaved) {
      await Wallet.destroyWallet();
      return false;
    }
    return address;
  }

  static async decryptLocalSavedWallet(password) {
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
  }

  static async encryptAndSaveMnemonic(mnemonic, password, path, network) {
    path = path || Wallet.getDefaultDerivePath();
    network = network || Wallet.getDefaultNetwork();
    const seed = bip39.mnemonicToSeed(mnemonic);
    const master = bip32.fromSeed(seed, network);
    const child = master.derivePath(path);
    const address = Wallet.getAddress(child, network);
    const wif = child.toWIF();
    const saveBody = aes256.encrypt(password, JSON.stringify({
      address,
      mnemonic,
      wif,
      path,
      network
    }));
    await Promise.all([secureStore.save(address, saveBody), stores.wallet.setAddress(address)]);
    return true;
  }

  static encryptWif(wif, password) {
    return bip39.generateMnemonic();
  }

  static async destroyWallet() {
    await Promise.all([secureStore.reset(), stores.wallet.delAddress()]);
  }
}