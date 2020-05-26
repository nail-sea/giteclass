
/*
    保存全局数据，不做state的更新，请勿导入
*/


export default {
    namespace: 'storage',
    state: {
        homeAllItemList:{
            // 1: { 1: [], page: 0 ,showPage:0},
            // 2: { 1: [], page: 0 ,showPage:0},
          },//首页链表
        searchRecommendList :{}//搜索推荐

    },

    effects: {
        *saveAction({ payload }, { put }) {
            yield put({
                type: 'save',
                payload: {
                    ...payload
                }
            });
        },
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload };
        },
    },

};
