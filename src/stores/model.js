import log from 'src/utils/log';

export default class Model {
  get = (url, params = {}) => {
    return new Promise((resolve, reject) => {
      let query = [];
      Object.keys(params).forEach(key => {
        query.push(`${key}=${params[key]}`);
      });
      query = query.join('&');
      let join = '';
      if (query) {
        if (url.includes('?')) {
          join = '&';
        } else {
          join = '?';
        }
      }
      fetch(`${url}${join}${query}`).then(res => {
        if (res.status !== 200) {
          log.warning('Api failed: ', {
            url: `${url}${join}${query}`,
            res,
          });
          reject(res);
        } else {
          res.json().then(responseJson => {
            resolve(responseJson);
          });
        }
      }).catch(error => {
        // networking error
        log.warningWithToast('common.network.failed', 'Fetch failed: ', {
          url: `${url}${join}${query}`,
          res,
          error: error.toString(),
        });
        resolve(null);
      });
    });
  };

  post = (url, body = '') => {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        body,
      }).then(res => {
        if (res.status !== 200) {
          log.warning('Api post failed: ', {
            url,
            body,
            res,
          });
          reject(res);
        } else {
          res.json().then(responseJson => {
            resolve(responseJson);
          });
        }
      }).catch(error => {
        // networking error
        log.warningWithToast('common.network.failed', 'Fetch post failed: ', {
          url,
          body,
          error: error.toString(),
        });
        resolve(null);
      });
    });
  };
}