import bip39 from 'bip39';
import bip32 from 'bip32';
import qtum from 'qtumjs-lib';
import bitcoin from 'bitcoinjs-lib';
import * as Keychain from 'react-native-keychain';

const qtumNetwork = qtum.networks.qtum;

const test = async () => {
  const username = 'zuck';
  const password = 'poniesRgr8';

  // Store the credentials
  await Keychain.setGenericPassword(username, password);

  try {
    // Retreive the credentials
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      alert('Credentials successfully loaded for user ' + credentials.username);
    } else {
      alert('No credentials stored')
    }
  } catch (error) {
    alert('Keychain couldn\'t be accessed!', error);
  }
  await Keychain.resetGenericPassword()
}

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
    test();
    /*const saveBody = aes256.encrypt(password, JSON.stringify({
      address,
      mnemonic,
      wif,
    }));*/
    return address;
  }

  static encryptWif(wif, password) {
    return bip39.generateMnemonic();
  }
}