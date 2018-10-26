import request from '../../../utils/request';
export function fetch(params) {
  return request(`/api/list`,
    {
      params: params,
      method: 'get'
    }
  );
}
export function addConfig(params) {
  return request(`/api/addConfig`,
    {
      params: params,
      method: 'get'
    }
  );
}