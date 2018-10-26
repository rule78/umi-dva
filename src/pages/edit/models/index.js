import { routerRedux } from 'dva/router';
import * as editService from '../services';
const formatFormData = (data) => {
    let formData = {}
    let FirstKey, SecondKey;
    for (var index = 0, len = data.length; index < len; index++) {
        FirstKey = `item${index + 1}Key`
        SecondKey = `item${index + 1}Value`
        formData[FirstKey] = data[index].key
        formData[SecondKey] = data[index].value
    }
    return formData
}
const formatFormIndex = (total) => {
    let formIndex = []
    for (var i=0;i<total;i++){
        formIndex.push(`${i+1}`)
    }
    return formIndex
}
export default {
    namespace: 'edit',
    state: {
        formIndex: [],
        formData: {},
        list: [],
        user: { name: 'admin' },
        login: false,
    },
    reducers: {
        initForm(state, { payload: { data: formData, formIndex } }) {
            return { ...state, formData, formIndex };
        },
        changeFormData(state, action) {
            const formData = { ...state.formData, ...action.payload }
            return { ...state, formData: formData };
        },
        changestate(state, action) {
            return { ...state, ...action.payload };
        }
    },
    effects: {
        *queryDetail({ payload: { id }, callback }, { call, put }) {
            const { data } = yield call(editService.fetch, { id });
            if (data.code && data.code == 200) {
                yield put({
                    type: 'initForm',
                    payload: {
                        data: formatFormData(data.payload),
                        formIndex: formatFormIndex(data.payload.length)
                    }
                });
                callback && callback()
            }
        },
        *login(payload, { call, put }) {
            yield put({
                type: 'changestate',
                action: { login: true }
            });
            yield put(routerRedux.push('/user'));
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return
        },
    },
};