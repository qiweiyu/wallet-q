import * as Keychain from 'react-native-keychain';
import { warning, fatal } from './log';

export default {
  async save(name, body) {
    try {
      await Keychain.setGenericPassword(name, body);
      return true;
    } catch (error) {
      fatal('Key Chain save fail', error);
      return false;
    }
  },
  async fetch(name) {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        if (credentials.username === name) {
          return credentials.password;
        } else {
          warning('Key Chain fetch success, but not same', {
            name,
            saveName: credentials.name,
          });
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      fatal('Key Chain fetch fail', error);
      return false;
    }
  },
  async reset() {
    return await Keychain.resetGenericPassword();
  },
};
