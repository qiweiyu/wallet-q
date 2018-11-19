import qtum from 'qtumjs-lib';

export default {
  api: {
    host: 'https://qtum.info/api',
  },
  wallet: {
    network: qtum.networks.qtum,
    derivePath: 'm/88\'/0\'/0\'',
  },
};