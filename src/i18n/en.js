export default {
  name: 'en',
  common: {
    network: {
      failed: 'Network Connecting Error',
      address: {
        failed: 'Sever Wallet Address Decode Failed',
      },
      tx: {
        notFound: 'Transaction not found',
      },
    },
    tx: {
      type: {
        transaction: 'Transaction',
        receive: 'Receive',
        send: 'Send',
        gasRefund: 'GAS Refund',
        gas: 'GAS',
        staking: 'Staking',
        coinbase: 'Coinbase',
      },
    },
    ok: 'OK',
    cancel: 'Cancel',
  },
  components: {
    address: {
      available: 'Available QTUM ',
      locked: 'Locked QTUM',
      address: 'QTUM Address',
    },
    loadingMore: {
      noMore: 'No more data',
      empty: 'No data now'
    },
  },
  account: {
    new: {
      welcome1: 'Welcome to Wallet·Q',
      welcome2: 'THE GATE TO BLOCKCHAIN',
      create: 'Create A New Wallet',
      importByMnemonic: 'Import Wallet By Mnemonic',
      importByWif: 'Import Wallet By Private Key (WIF)',
      importByAddress: 'Import Wallet By Address',
    },
    recover: {
      drawGestureToUnlock: 'Draw Gesture Password To Unlock Your Wallet',
      drawGestureError: 'Gesture Password is wrong',
      logout: 'LOGOUT',
      logoutDesc: 'Logout will destroy the private data stores in this device, please ensure you have backed up your private key or mnemonics',
      unlockSuccess: 'Unlock Success',
    },
    setPassword: {
      title: 'Set Unlock Password',
      setGesturePassword: 'Set A Gesture Password',
      gesturePasswordDesc: 'This gesture is for locking your wallet, please remember it carefully. You will never unlock your wallet if you lose it.',
      gesturePasswordRule: 'The Gesture Should Link At Least Four Points',
      repeatGesturePassword: 'Please Repeat Your Password',
      repeatPasswordFail: 'Repeat Password Fail',
      resetPassword: 'Reset Password',
      setSuccess: 'Set Success',
    },
    import: {
      wifLabel: 'Please input private key (WIF)',
      mnemonicLabel: 'Please input mnemonics(Split by space)',
      addressLabel: 'Please input address',
      pathLabel: 'HD Wallet Path',
      confirm: 'Confirm import',
      mnemonicEmpty: 'Mnemonic is Empty',
      mnemonicError: 'Mnemonics are not standard mnemonic words',
      mnemonicErrorDesc: 'But it can also create a wallet as well, do you confirm to go?',
      wifEmpty: 'Private Key is Empty',
      wifError: 'Private Key cannot be decoded',
      wifErrorDesc: 'Please input the right private key',
      addressEmpty: 'Address is Empty',
      addressError: 'Address cannot be decoded',
      addressErrorDesc: 'Please input the right address',
    },
  },
  wallet: {
    home: {
      title: 'Wallet',
      balance: 'Balance',
    },
    receive: {
      title: 'Receive Code',
      amount: 'Amount',
    },
    send: {
      title: 'Transfer',
      address: 'Receiver\'s Address',
      amount: 'Amount',
      feeRate: 'Fee Rate',
      recommend: 'Recommend',
      fee: 'Fee',
      availableAmount: 'Available Amount',
      build: 'Build Transfer',
      addressEmpty: 'Address is Empty',
      addressError: 'Address cannot be decoded',
      addressErrorDesc: 'Please input the right address',
      amountTooMuch: 'Send amount greater than the available amount',
      amountError: 'Send amount should be a number greater than 0',
      amountErrorDesc: 'Please input a right amount',
    },
  },
};
