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
      let response = fetch(`${url}${join}${query}`);
      response.then(res => {
        if (res.status !== 200) {
          log.warning('Api failed: ', {
            url,
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
          url,
          error: error.toString(),
        });
        resolve(null);
      });
    });
  };
}