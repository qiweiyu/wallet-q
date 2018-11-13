import Toast from 'react-native-simple-toast';
import i18n from 'src/i18n';

const warning = (name, info) => {
  console.log('warning:', name, info);
};

const warningWithToast = (msgKey, name, info) => {
  warning(name, info);
  Toast.show(i18n.t(msgKey));
};

const fatal = (name, info) => {
  console.log('fatal:', name, info);
  throw `fatal: ${name}: ${JSON.stringify(info)}`;
};

export default {
  warning,
  warningWithToast,
  fatal
};