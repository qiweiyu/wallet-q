import qtum from 'qtumjs-lib';

export default {
  api: {
    host: 'https://testnet.qtum.info/api',
  },
  wallet: {
    network: qtum.networks.qtum_testnet,
    derivePath: 'm/88\'/0\'/0\'',
  },
};