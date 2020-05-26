import Api from '@/utils/request';
import Taro from '@tarojs/taro'
import ENUM from '@/config/enum'
import Dq from "@/config/Dq";

export default {
    namespace: 'publish',
    state: {
        post_id: '',//帖子Id
        top: {
            top_status: ENUM.NOTOPSTATUS, //是否置顶  
            top_day: '',
            top_total_money: '',
            index: -1
        },
        positionArr: [],
        salaryArr: [],
        labelArr: [],
        result: '',
        params: {
        }
    },

    effects: {
        * publish({ payload }, { select, call, put,take }) {
            const top = yield select(state => state.classModels.top)
            const result = yield call(Api.publish, { ...payload, ...top });

            if (result) {
                yield put({ type: 'savePostId', payload: { post_id: result } })
            }
            return result
        },
        * saveTop({ payload }, { put }) {
            yield put({ type: 'save', payload })
        },
        * orderPayment({ payload }, { call, put }) {
            const result = yield call(Api.orderPayment, payload);
            yield put({ type: 'saveOrderPayment', payload: { result } })
            return result
        },
        * postOrderPay({ payload }, { call, put }) {
            const result = yield call(Api.postorderPay, { ...payload });
            if( payload.pay_method=='wx'){
                let { trade_no, charge_obj } = result
                charge_obj = typeof charge_obj === 'string'?JSON.parse(charge_obj):charge_obj
                if(charge_obj){
                    yield put({
                        type: "Auth/save",
                        payload: {
                            type: "payfor_config_info",
                            result: {
                                trade_no,
                                charge_obj
                            }
                        }
                    });
                } 
                return { trade_no, charge_obj }
            }else{
                return result
            }
        },
        * payTop({ payload }, { call, put }) {
            const result = yield call(Api.payTop, { ...payload })
            if(payload.pay_method=='wx'){
                let { trade_no, charge_obj } = result
                charge_obj = typeof charge_obj === 'string'?JSON.parse(charge_obj):charge_obj
                if(charge_obj){
                    yield put({
                        type: "Auth/save",
                        payload: {
                            type: "payfor_config_info",
                            result: {
                                trade_no,
                                charge_obj
                            }
                        }
                    });
                } 
                return { trade_no, charge_obj }
            }else{
                return result
            }
           
        },
        * payCallback({ payload }, { call, put , select}) {
            const result = yield call(Api.payCallback, payload)
            return result
        },
        * couponPay({ payload }, { call, put }) {
            const result = yield call(Api.couponPay, { ...payload })
            return result
        },
        * getValue({ payload }, { select, put }) {
            const params = yield select(state => state.publish.params)
            yield put({ type: 'saveValue', payload: { params: { ...params, ...payload } } })
        }
    },

    reducers: {
        savePostId(state, { payload }) {
            return { ...state, ...payload }
        },
        save(state, { payload }) {
            const { status, key, index, value } = payload
            let data = { top_status: status, index, top_day: key, top_total_money: value }
            return { ...state, top: { ...data } };
        },
        savePublishHire(state, { payload }) {
            return { ...state, ...payload }
        },
        saveOrderPayment(state, { payload }) {
            return { ...state, ...payload }
        },
        savePostOrderPay(state, { payload }) {
            return { ...state, ...payload }
        },
        saveValue(state, { payload }) {
            return { ...state, ...payload }
        },
    },

};

