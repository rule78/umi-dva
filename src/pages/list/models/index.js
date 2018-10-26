import { routerRedux } from 'dva/router';
import * as listService from '../services/list';
import { Toast } from 'antd-mobile';
export default {
    namespace: 'list',
    state: {
        list: [],
        total: null,
        user:{
            name: 'admin'
        },
        login: false,
    },
    reducers: {
        save(state, { payload: { data: list, total } }) {
            return { ...state, list, total };
        },
        changestate(state, action) {
            return {
                ...state,
                ...action.payload 
            };
        }
    },
    effects: {
        *queryList({ payload: { page }, callback }, { call, put }) {
            const { data } = yield call(listService.fetch, { page });
            if(data.code && data.code ==200){
                yield put({ 
                    type: 'save',
                    payload: { data: data.payload, total: data.payload.length } 
                });
            }
            callback && callback()
        },
        *addConfig({ payload: { name }, callback }, { call, put }) {
            const { data } = yield call(listService.addConfig, { name });
            if(data.code && data.code ==200){
                callback && callback()
            }else{
                Toast.info(data.message || '新增失败')
            }
        },
        *login(payload, { call, put }) {
            yield put({
                type: 'changestate',
                action:{login: true}
            });
            yield put(routerRedux.push('/user'));
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                // if (pathname === '/list') {
                //     dispatch({ type: 'fetch' });
                // }
            });
        },
    },
};