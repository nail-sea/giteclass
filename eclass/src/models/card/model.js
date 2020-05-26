import Api from '@/utils/request';

export default {
    namespace: 'cardModels',
    state: {
        cardDetail: {},
        recommendList: [] //推荐列表
    },

    effects: {
        * fetchCardDetail({ payload }, { call, put }) {
            const result = yield call(Api.getCardDetail, payload)
            yield put({
                type: 'save', payload: {
                    cardDetail: result
                }
            })
            return result
        },
        * fetchGetrecommendpost({ payload }, { call, put, select, take }) {//推荐列表
            const cardDetail = yield select(state => state.cardModels.cardDetail)
            const { primary_category, second_category, position, provinces_id, city_id, area_id, county_id, community_id } = cardDetail
            let area_ids = {}
            if (provinces_id && provinces_id != '') area_ids.provinces_id = provinces_id
            if (city_id && city_id != '') area_ids.city_id = city_id
            if (area_id && area_id != '') area_ids.area_id = area_id
            if (county_id && county_id != '') area_ids.county_id = county_id
            if (community_id && community_id != '') area_ids.community_id = community_id
            const result = yield call(Api.getrecommendpost, { primary_category, second_category, position, ...area_ids, ...payload })
            yield put({
                type: 'saveRecommendList', payload: {
                    recommendList: result.list || [],
                    isRefresh: payload.page == 1
                }
            })
            return result
        }
    },

    reducers: { 
        save(state, { payload }) {
            return { ...state, ...payload }
        },
        saveRecommendList(state, { payload }) {
            let recommendList = payload.isRefresh ? payload.recommendList : [...state.recommendList, ...payload.recommendList]
            return { ...state, ...{ recommendList } }
        }
    },

};

