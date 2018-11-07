import i18n from 'i18n-js';
import en from './en';
import zh from './zh';

i18n.fallbacks = true;
i18n.translations = { en, zh };
//todo add read config from device
//i18n.locale = Localization.locale;
i18n.locale = 'zh';

export default i18n;