import Api from '@/utils/request';
import { stdConfig } from '@/utils/common';

export default {
    namespace: 'classModels',
    state: {
        labelStatistical: [],//岗位福利
        positionStatistical: [],//岗位推荐
        categoryStatistical:{
            post_num: 0,
            visit_num: 0,
            extend:{}
        },
        buyRentHouseStatus:{},//买房租房-房屋状态统计接口
        categoryList: [],//类目接口
    },

    effects: {
        * fetchLabelStatistical({ payload }, { call, put }) {
            const result = yield call(Api.labelStatistical, payload)
            if(result){
                result.forEach(item => {
                    item.label = stdConfig.getData('jobHunting','label',item.key)
                })
                yield put({
                    type: 'save', payload: {
                        labelStatistical: result
                    }
                })
            }
        },
        * fetchPositionStatistical({ payload }, { call, put }) {
            const result = yield call(Api.positionStatistical, payload)
            if(result){
                result.forEach(item => {
                    item.label = stdConfig.getData('jobHunting','position',item.key)
                })
                yield put({
                    type: 'save', payload: {
                        positionStatistical: result
                    }
                })
            }
        },
        * fetchCategoryList({ payload }, { call, put }) {
            if(payload.second_category != undefined && payload.second_category == -1){
                delete payload.second_category;
            }
            const result = yield call(Api.categoryList, payload)
            yield put({
                type: 'saveCategoryList', payload: {
                    categoryList: result.list || [],
                    isRefresh: payload.page == 1
                }
            })
            return result
        },
        * fetchCategoryStatistical({ payload }, { call, put }) {
            const result = yield call(Api.categoryStatistical, payload)
            yield put({
                type: 'save', payload: {
                    categoryStatistical: result
                }
            })
        },
        * fetchBuyRentHouseStatus({ payload }, { call, put }) {
            const result = yield call(Api.buyRentHouseStatus, payload)
            if(result){
                let obj = {};
                for (let i in result){
                    let item = result[i];
                    obj[item.key] = item.doc_count;
                }

                yield put({
                    type: 'save', payload: {
                        buyRentHouseStatus: obj
                    }
                })
            }
        }
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        },
        saveCategoryList(state, { payload }) {
            let categoryList = payload.isRefresh ? payload.categoryList : [...state.categoryList, ...payload.categoryList]
            return { ...state, ...{ categoryList } }
        },
    },

};

