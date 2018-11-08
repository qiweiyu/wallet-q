import { Dimensions, Platform } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// next two line copy from react-navigation-stack/dist/view/Header/Header.js
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  appBarHeight: APPBAR_HEIGHT,
  statusBarHeight: STATUSBAR_HEIGHT,
};
