import bip39 from 'bip39';
import bip32 from 'bip32';
import qtum from 'qtumjs-lib';
import bitcoin from 'bitcoinjs-lib';
import { aes256 } from './encrypt';
import secureStore from './secureStore';
import stores from 'src/stores';

const qtumNetwork = qtum.networks.qtum;

export default {
  getDefaultNetwork: () => {
    return qtumNetwork;
  },

  getDefaultDerivePath: () => {
    return 'm/88\'/0\'/0\'';
  },

  getAddress:
    (node, network) => {
      return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address;
    },
  generateMnemonic: () => {
    return bip39.generateMnemonic();
  }
  ,
  validateMnemonic: (mnemonic) => {
    return bip39.validateMnemonic(mnemonic);
  },
  validateWif: (wif) => {
    try {
      bitcoin.ECPair.fromWIF(wif, this.getDefaultNetwork());
      return true;
    } catch (error) {
      return false;
    }
  },

  checkLocalSavedWallet: async () => {
    const address = await stores.wallet.getAddress();
    const hasSaved = await secureStore.fetch(address);
    if (!hasSaved) {
      await this.destroyWallet();
      return false;
    }
    return address;
  },
  decryptLocalSavedWallet: async (password) => {
    const address = await stores.wallet.getAddress();
    const savedData = await secureStore.fetch(address);
    if (!savedData) {
      await this.destroyWallet();
      return false;
    }
    const decryptedBody = aes256.decrypt(password, savedData);
    try {
      return JSON.parse(decryptedBody);
    } catch (error) {
      return false;
    }
  },
  encryptAndSaveMnemonic: async (mnemonic, password, path, network) => {
    path = path || this.getDefaultDerivePath();
    network = network || this.getDefaultNetwork();
    const seed = bip39.mnemonicToSeed(mnemonic);
    const master = bip32.fromSeed(seed, network);
    const child = master.derivePath(path);
    const address = this.getAddress(child, network);
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
  },
  encryptAndSaveWif: async (wif, password, network) => {
    network = network || this.getDefaultNetwork();
    const keyPair = bitcoin.ECPair.fromWIF(wif);
    const address = this.getAddress(keyPair, network);
    const saveBody = aes256.encrypt(password, JSON.stringify({
      address,
      wif,
      network,
    }));
    await Promise.all([secureStore.save(address, saveBody), stores.wallet.setAddress(address)]);
    return true;
  },
  destroyWallet: async () => {
    await Promise.all([secureStore.reset(), stores.wallet.delAddress()]);
  },
  shortAddress: (address) => {
    return `${address.substr(0, 4)}****${address.substr(-4)}`;
  },
};