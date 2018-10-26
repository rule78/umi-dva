import request from '../../../utils/request';
export function fetch(params) {
  return request(`/api/detail`,
    {
      params: params,
      method: 'get'
    }
  );
}