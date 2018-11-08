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
    }));
    await Promise.all([secureStore.save(address, saveBody), stores.wallet.setAddress(address)]);
    return true;
  }

  static encryptWif(wif, password) {
    return bip39.generateMnemonic();
  }
}