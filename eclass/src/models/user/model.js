import Taro from '@tarojs/taro'
import Api from '@/utils/request';
import global,{ setGlobalData } from '@/utils/global'

export default {
    namespace: 'user',
    state: {
        userInfo: {},
        personalpageList: [], // 个人主页
        publishList: [], // 发布管理
        identify:null,//邀请码 {is_agent =  0:用户上级代理标示 ，1:代理标示}
        shareAccount: '', //邀请码
        mini_programs_qrcode:'',//小程序码
    },

    effects: {
        * fetchMyInfo({ payload = {} }, { call, put }) {// 获取用户信息
            let msg = global.userInfo
            if (payload.isRefresh || !msg || Object.keys(msg).length == 0) {
                msg = yield call(Api.myInfo, payload)
                global.userInfo = msg
                let userInfo = { userInfo: msg }
                yield put({
                    type: 'save',
                    payload: { ...userInfo }
                })
            }
            return msg
        },
        * fetchPersonalhomepage({ payload }, { select, call, put, take }) {
            let result = yield call(Api.personalhomepage, payload)
            if(result){
                yield put({
                    type: 'savePersonalhomepage', payload: {
                        personalpageList: result.list || [],
                        isRefresh: payload.page == 1
                    }
                })
            }
            return result
        },
        * fetchPublishmanagement({ payload }, { select, call, put, take }) {
            let result = yield call(Api.publishmanagement, payload)
            if(result){
                yield put({
                    type: 'savePublishList', payload: {
                        publishList: result.list || [],
                        isRefresh: payload.page == 1
                    }
                })
            }
            return result
        },
        
        * fetchOtheruserinfo({ payload }, { select, call, put, take }) {
            if(payload.uid && payload.uid != ''){
                let result = yield call(Api.otheruserinfo, payload)
                result.id = payload.uid
                return result
            } else {
                let id = yield select(state => (state.user.userInfo && state.user.userInfo.id) || '')
                if(!id){
                    yield put({ type: 'fetchMyInfo', payload: {} })
                    yield take('fetchMyInfo/@@end') //直到监听到b结束才继续执行
                }
                let userInfo = yield select(state => state.user.userInfo)
                return userInfo
            }
        },
        * fetchPersonalpublishpostcount({ payload }, { call }) {
            let result = yield call(Api.personalpublishpostcount, payload)
            return result
        },
        * fetchModifysex({ payload }, { select, call, put, take }) {
            let resule = yield call(Api.modifysex, payload)
            if(resule){
                Taro.showToast({ title: '修改成功', icon: 'none', duration: 2000 })
                const { sex } = payload
                const userInfo = { ...global.userInfo, ...{ sex } }
                global.userInfo = userInfo
                yield put({
                    type: 'save',
                    payload: { ... { userInfo } }
                })
            }
        },
        * fetchModifyuname({ payload }, { select, call, put, take }) {
            let resule = yield call(Api.modifyuname, payload)
            if(resule){
                Taro.showToast({ title: '修改成功', icon: 'none', duration: 2000 })
                const { uname } = payload
                const userInfo = { ...global.userInfo, ...{ uname } }
                global.userInfo = userInfo
                yield put({
                    type: 'save',
                    payload: { ... { userInfo } }
                })
            }
            return resule
        },
        * fetchModifybirth({ payload }, { select, call, put, take }) {
            let resule = yield call(Api.modifybirth, payload)
            if(resule){
                Taro.showToast({ title: '修改成功', icon: 'none', duration: 2000 })
                const { birth } = payload
                const userInfo = { ...global.userInfo, ...{ birth } }
                global.userInfo = userInfo
                yield put({
                    type: 'save',
                    payload: { ... { userInfo } }
                })
            }
        },
        * fetchModifyavatar({ payload }, { select, call, put, take }) {
            let resule = yield call(Api.modifyavatar, payload)
            if(resule){
                global.userInfo = {}
                yield put({ type: 'fetchMyInfo', payload: {} })
                yield take('fetchMyInfo/@@end')
                Taro.showToast({ title: '修改成功', icon: 'none', duration: 2000 })
            }
        },
        * fetchCancelpayment({ payload }, { select, call, put, take }) {
            let resule = yield call(Api.cancelpayment, payload)
            if(resule){
                Taro.showToast({ title: '帖子已取消', icon: 'none', duration: 2000 })
            }
            return resule
        },
        * fetchDownshelfpost({ payload }, { select, call, put, take }) {
            let resule = yield call(Api.downshelfpost, payload)
            if(resule){
                Taro.showToast({ title: '帖子已下架', icon: 'none', duration: 2000 })
            }
            return resule
        },
        * fetchGetshareIdentify({ payload }, { select, call, put, take }) {
            let { identify, account, mini_programs_qrcode} = yield call(Api.getshareIdentify, payload)
            
            if(identify){
                yield put({
                    type: 'save',
                    payload: { identify,shareAccount:account,mini_programs_qrcode }
                })
            }
        },
        * generateqrcode({ payload={} }, { select, call, put, take }) {
            let resule = yield call(Api.generateqrcode, payload)
            console.log(resule)
            return resule;
        },
        
    },
    reducers: { 
        save(state, { payload }) {
            return { ...state, ...payload };
        },
        savePersonalhomepage(state, { payload }) {
            let personalpageList = payload.isRefresh ? payload.personalpageList : [...state.personalpageList, ...payload.personalpageList]
            return { ...state, ...{ personalpageList } }
        },
        savePublishList(state, { payload }) {
            let publishList = payload.isRefresh ? payload.publishList : [...state.publishList, ...payload.publishList]
            return { ...state, ...{ publishList } }
        },
    },

};
