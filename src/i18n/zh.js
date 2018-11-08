export default {
  account: {
    new: {
      welcome1: '欢迎使用Wallet·Q',
      welcome2: '为您打开区块链的大门',
      create: '创建新钱包',
      importByMnemonic: '从助记词导入钱包',
      importByWif: '从私钥(WIF)导入钱包',
    },
    create: {
      title: '创建新钱包',
      setGesturePassword: '设置手势密码',
      gesturePasswordDesc: '这是您的钱包解锁密码，请牢记。如果丢失您的钱包只能通过备份重新导入。',
      gesturePasswordRule: '请连接至少四个点',
      repeatGesturePassword: '请再输入一次进行验证',
      repeatPasswordFail: '验证密码失败',
      resetPassword: '重新设置密码',
    },
    recover: {
      drawGestureToUnlock: '绘制手势密码解锁钱包',
      drawGestureError: '手势密码错误',
      logout: '退出登录',
      logoutDesc: '退出登录将会清空本机存储的密钥信息，请确保您已经备份好了私钥或者助记词',
      unlockSuccess: '解锁成功',
    },
    import: {
      wifLabel: '请输入私钥(WIF)',
      mnemonicLabel: '请输入助记词(以空格分隔)',
      pathLabel: 'HD钱包路径',
      confirm: '确认导入钱包',
      mnemonicEmpty: '助记词为空',
      mnemonicError: '助记词不是标准助记词',
      mnemonicErrorDesc: '这样也可以导入钱包，请您再次确认就按这个助记词导入吗？',
      wifEmpty: '私钥为空',
      wifError: '私钥无法解码',
      wifErrorDesc: '请输入正确的私钥然后重试',
    },
  },
};
