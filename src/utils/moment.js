import moment from 'moment';
import i18n from 'src/i18n';

moment.locale(i18n.t('name'));
moment.prototype.smartFormat = function() {
  const diff = Math.abs(Date.now() - this._d.getTime());
  const OneDay = 86400000;
  let format = '';
  if (diff < OneDay) {
    format = 'HH:mm:ss';
  } else if (diff < OneDay * 180) {
    format = 'MM-DD HH:mm:ss';
  } else {
    format = 'YYYY-MM-DD HH:mm:ss';
  }
  return this.format(format);
};

export default moment;