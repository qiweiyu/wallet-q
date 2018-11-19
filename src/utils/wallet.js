import bip39 from 'bip39';
import bip32 from 'bip32';
import qtum from 'qtumjs-lib';
import bitcoin from 'bitcoinjs-lib';
import BigNumber from 'bignumber.js';
import bs58check from 'bs58check';
import coinSelect from 'coinselect';
import { aes256 } from './encrypt';
import secureStore from './secureStore';
import log from './log';
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

const validateAddress = (address) => {
  try {
    const payload = bs58check.decode(address);
    if (payload.length !== 21) {
      return false;
    }
    const network = getDefaultNetwork();
    const version = payload.readUInt8(0);

    if (version !== network.pubKeyHash && version !== network.scriptHash) {
      return false;
    }
    return true
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
  return address;
};

const decryptLocalSavedWallet = async (password) => {
  const address = await stores.wallet.getAddress();
  const savedData = await secureStore.fetch(address);
  if (!savedData) {
    await destroyWallet();
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

const encryptAndSaveAddress = async (address, password, network) => {
  network = network || getDefaultNetwork();
  const saveBody = aes256.encrypt(password, JSON.stringify({
    address,
    network,
  }));
  await Promise.all([secureStore.save(address, saveBody), stores.wallet.setAddress(address)]);
  return true;
};

const destroyWallet = async () => {
  await Promise.all([secureStore.reset(), stores.wallet.delAddress()]);
};

const calTxType = (tx, address = '') => {
  let type = '';
  if (tx.isCoinbase) {
    type = 'coinbase';
  } else if (tx.isCoinstake) {
    type = 'staking';
    if (address) {
      try {
        let reward = null;
        let stakingAddress = null;
        let maySplitStaking = false;
        tx.outputs.forEach((output) => {
          if (output.index === 1) {
            stakingAddress = output.address;
          } else if (output.index === 2) {
            maySplitStaking = (stakingAddress === output.address);
          } else if (output.index === 3) {
            reward = new BigNumber(output.value);
          }
          if (address === output.address) {
            if (output.index > 11) {
              type = 'gasRefund';
            } else if (output.index === 11) {
              if (maySplitStaking) {
                const value = new BigNumber(output.value);
                if (value.minus(reward).abs() > 10) {
                  // todo check the contract tx is better
                  type = 'gasRefund';
                }
              } else {
                type = 'gasRefund';
              }
            }
          }
        });
      } catch (error) {
        log.warning('Try to define address type failed', error);
      }
    }
  } else {
    type = 'transaction';
    if (address) {
      let inputValue = new BigNumber(0);
      let outputValue = new BigNumber(0);
      let isCall = false;
      tx.inputs.forEach((input) => {
        if (input.address === address) {
          inputValue = inputValue.plus(input.value);
        }
      });
      tx.outputs.forEach((output) => {
        if (output.scriptPubKey.type === 'call') {
          isCall = true;
        }
        if (output.address === address) {
          outputValue = outputValue.plus(output.value);
        }
      });
      if (isCall) {
        type = 'gas';
      } else {
        if (inputValue.gt(outputValue)) {
          type = 'send';
        } else {
          type = 'receive';
        }
      }
    }
  }
  return type;
};

const satPos = 8;
const changeUnitFromSatTo1 = (amountSat) => {
  const amountSatBig = new BigNumber(amountSat);
  return amountSatBig.div(Math.pow(10, satPos)).toFormat();
};
const changeUnitFrom1ToSat = (amount1) => {
  const amountBig = new BigNumber(amount1);
  return amountBig.times(Math.pow(10, satPos)).toString();
};
const changeFeeRateUnitFrom1KToSatB = (feeRate1) => {
  return feeRate1 * (10 ** satPos) / 1024;
};

const calFee = (utxoList, targets, feeRate1) => {
  const feeRate = changeFeeRateUnitFrom1KToSatB(feeRate1);
  return coinSelect(utxoList, targets, feeRate);
};

export default {
  getDefaultNetwork,
  getDefaultDerivePath,
  getAddress,
  generateMnemonic,
  validateMnemonic,
  validateWif,
  validateAddress,
  checkLocalSavedWallet,
  decryptLocalSavedWallet,
  destroyWallet,
  encryptAndSaveMnemonic,
  encryptAndSaveWif,
  encryptAndSaveAddress,
  calTxType,
  changeUnitFromSatTo1,
  changeUnitFrom1ToSat,
  calFee,
};