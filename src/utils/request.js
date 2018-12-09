import fetch from 'dva/fetch';
import * as utils from './../utils';
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  let requestUrl = url
  const option = {
    method: options.method ? options.method : 'get',
    mode: 'cors',
    body: options.method === 'get' ? '' : JSON.stringify(options.params),
    headers: options.headers ? options.headers : {},
    credentials: 'include'
  }
  if(options.method === 'get'){
    requestUrl = url + utils.formatParams(options.params)
    delete option.body
  }
  const response = await fetch(requestUrl, option);
  checkStatus(response);
  const data = await response.json();
  const ret = {
    data,
    headers: {},
  };
  if (response.headers.get('x-total-count')) {
    ret.headers['x-total-count'] = response.headers.get('x-total-count');
  }
  return ret;
}