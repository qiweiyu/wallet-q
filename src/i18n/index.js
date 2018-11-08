import { NativeModules, Platform } from 'react-native';
import i18n from 'i18n-js';
import en from './en';
import zh from './zh';

const locale = Platform.OS === 'ios' ? NativeModules.SettingsManager.settings.AppleLocale : NativeModules.I18nManager.localeIdentifier;

i18n.fallbacks = true;
i18n.translations = { en, zh };
//todo add read config from device
//i18n.locale = Localization.locale;
i18n.locale = locale;

export default i18n;