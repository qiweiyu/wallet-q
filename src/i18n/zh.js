export default {
  name: 'zh',
  common: {
    network: {
      failed: '网络连接失败',
      address: {
        failed: '服务端账户地址解析失败',
      },
      tx: {
        notFound: '交易不存在',
      },
    },
    tx: {
      type: {
        transaction: '交易',
        receive: '转入',
        send: '转出',
        gasRefund: 'GAS退款',
        gas: 'GAS消费',
        staking: '挖矿',
        coinbase: '区块头',
      },
    },
    ok: '好',
    cancel: '算了',
  },
  components: {
    address: {
      available: '可用余额',
      locked: '锁定额度',
      address: '地址',
    },
    loadingMore: {
      noMore: '没有更多数据了',
      empty: '当前没有数据',
    },
  },
  account: {
    new: {
      welcome1: '欢迎使用Wallet·Q',
      welcome2: '为您打开区块链的大门',
      create: '创建新钱包',
      importByMnemonic: '从助记词导入钱包',
      importByWif: '从私钥(WIF)导入钱包',
      importByAddress: '从地址导入钱包',
    },
    unlock: {
      drawGestureToUnlock: '绘制手势密码解锁钱包',
      drawGestureError: '手势密码错误',
      logout: '退出登录',
      logoutDesc: '退出登录将会清空本机存储的密钥信息，请确保您已经备份好了私钥或者助记词',
      unlockSuccess: '解锁成功',
      sendMessage1: '将要发送',
      sendMessage2: '到地址',
      cancelSend: '取消转账',
    },
    setPassword: {
      title: '设置解锁密码',
      setGesturePassword: '设置手势密码',
      gesturePasswordDesc: '这是您的钱包解锁密码，请牢记。如果丢失您的钱包只能通过备份重新导入。',
      gesturePasswordRule: '请连接至少四个点',
      repeatGesturePassword: '请再输入一次进行验证',
      repeatPasswordFail: '验证密码失败',
      resetPassword: '重新设置密码',
      setSuccess: '设置成功',
    },
    import: {
      wifLabel: '请输入私钥(WIF)',
      mnemonicLabel: '请输入助记词(以空格分隔)',
      addressLabel: '请输入地址',
      pathLabel: 'HD钱包路径',
      confirm: '确认导入钱包',
      mnemonicEmpty: '助记词为空',
      mnemonicError: '助记词不是标准助记词',
      mnemonicErrorDesc: '这样也可以导入钱包，请您再次确认就按这个助记词导入吗？',
      wifEmpty: '私钥为空',
      wifError: '私钥无法解码',
      wifErrorDesc: '请输入正确的私钥然后重试',
      addressEmpty: '地址为空',
      addressError: '地址无法解码',
      addressErrorDesc: '请输入正确的地址然后重试',
    },
  },
  wallet: {
    home: {
      title: '钱包',
      balance: '余额',
    },
    receive: {
      title: '收款码',
      amount: '金额',
    },
    send: {
      title: '转账',
      address: '收款地址',
      amount: '转账金额',
      feeRate: '费率',
      recommend: '推荐',
      fee: '手续费',
      availableAmount: '可用余额',
      build: '创建交易',
      addressEmpty: '地址为空',
      addressError: '地址无法解码',
      addressErrorDesc: '请输入正确的地址然后重试',
      amountTooMuch: '转账金额大于可用余额',
      amountError: '转账金额必须是一个大于零的数字',
      amountErrorDesc: '请输入正确的金额然后重试',
      feeAmount: '本次转账手续费为',
      feeAmountTooMuch: '手续费加上转账金额大于可用金额',
    },
  },
};
