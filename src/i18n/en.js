export default {
  common: {
    network: {
      failed: 'Network Connecting Error',
      address: {
        failed: 'Sever Wallet Address Decode Failed',
      },
    },
  },
  components: {
    address: {
      available: 'Available QTUM ',
      locked: 'Locked QTUM',
      address: 'QTUM Address',
    },
  },
  account: {
    new: {
      welcome1: 'Welcome to Wallet·Q',
      welcome2: 'THE GATE TO BLOCKCHAIN',
      create: 'Create A New Wallet',
      importByMnemonic: 'Import Wallet By Mnemonic',
      importByWif: 'Import Wallet By Private Key (WIF)',
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
      pathLabel: 'HD Wallet Path',
      confirm: 'Confirm import',
      mnemonicEmpty: 'Mnemonic is Empty',
      mnemonicError: 'Mnemonics are not standard mnemonic words',
      mnemonicErrorDesc: 'But it can also create a wallet as well, do you confirm to go?',
      wifEmpty: 'Private Key is Empty',
      wifError: 'Private Key cannot be decoded',
      wifErrorDesc: 'Please input the right private key',
    },
  },
  wallet: {
    home: {
      title: 'Wallet',
    },
  },
};
