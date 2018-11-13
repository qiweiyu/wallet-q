import log from 'src/utils/log';

export default class Model {
  get = (url) => {
    return new Promise((resolve, reject) => {
      let response = fetch(url);
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