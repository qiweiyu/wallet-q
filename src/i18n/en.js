export default {
  account: {
    new: {
      welcome1: 'Welcome to Wallet·Q',
      welcome2: 'THE GATE TO BLOCKCHAIN',
      create: 'Create A New Wallet',
      importByMnemonic: 'Import Wallet By Mnemonic',
      importByWif: 'Import Wallet By Private Key (WIF)',
    },
    create: {
      title: 'Create New Wallet',
      setGesturePassword: 'Set A Gesture Password',
      gesturePasswordDesc: 'This gesture is for locking your wallet, please remember it carefully. You will never unlock your wallet if you lose it.',
      gesturePasswordRule: 'The Gesture Should Link At Least Four Points',
      repeatGesturePassword: 'Please Repeat Your Password',
      repeatPasswordFail: 'Repeat Password Fail',
      resetPassword: 'Reset Password',
    },
    recover: {
      drawGestureToUnlock: 'Draw Gesture Password To Unlock Your Wallet',
      drawGestureError: 'Gesture Password is wrong',
      logout: 'LOGOUT',
      logoutDesc: 'Logout will destroy the private data stores in this device, please ensure you have backed up your private key or mnemonics',
      unlockSuccess: 'Unlock Success',
    },
    import: {
      wifLabel: 'Please input private key (WIF)',
      mnemonicLabel: 'Please input mnemonics(Split by space)',
      pathLabel: 'HD Wallet Path',
      confirm: 'Confirm import',
    }
  },
};
