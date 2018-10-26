import { delay } from 'roadhog-api-doc';
import mockjs from 'mockjs';
const proxy = {
    'GET /api/users': ['a', 'b'],
    'GET /api/list': mockjs.mock({
        code: 200,
        'payload|5': [{ 'name': '@city', time: '2018/10/24', 'id|+1': 1, 'status|0-2': 1}],
    }),
    'GET /api/addConfig': {
      code : 404,
      message : '此功能未完成'
    },
    'GET /api/detail': {
      code: 200,
      payload:[
        {key: 'activityBanner', value: ''},
        {key: 'activityRule', value: '新手专享'},
        {key: 'activityTime', value: '2018/10/24'},
      ]
    }
  }
  export default delay(proxy, 1000);