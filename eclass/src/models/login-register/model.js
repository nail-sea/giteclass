import Taro from '@tarojs/taro'
import Api from '@/utils/request';
import { setGlobalData } from '@/utils/common'
import Storage from '@/utils/storage'
import global from '../../utils/global'

export default {
    namespace: 'loginRegister',
    state: {},

    effects: {
        * fetchLogin({ payload }, { call, put, take }) {
            let msg = yield call(Api.login, payload)
            if (msg) {
                Storage.getInstance().setLoginState(msg.is_login)
                Storage.getInstance().setToken(msg.token)
                if(msg.is_login === 1) {
                    // yield put({type: 'user/fetchGetshareIdentify', payload: {}})
                    // yield take('user/fetchGetshareIdentify/@@end')
                }
                
            }
            return msg
        },
        * fetchGetVerifyCode({ payload }, { call, put }) {
            let data = yield call(Api.getVerifyCode, payload)
            if (data) {
                Taro.showToast({ title: '验证码已发送，请注意查收', icon: 'none', duration: 3000 })
            }
            return data
        },
        * fetchChangemobile({ payload }, { call, put }) {
            let data = yield call(Api.changemobile, payload)
            if (data && payload.type == 'change_mobile') {
                Taro.showToast({ title: '设置成功', icon: 'none', duration: 2000 })
            }
            return data
        },
        * fetchModifyPasswd({ payload }, { call, put }) {
            let data = yield call(Api.modifypasswd, payload)
            if (data) {
                Taro.showToast({ title: '设置成功', icon: 'none', duration: 2000 })
            }
            return data
        },
        * fetchForgotpasswd({ payload }, { call, put }) {
            let data = yield call(Api.forgotpasswd, payload)
            if (data && payload.type == 'set_passwd') {
                Taro.showToast({ title: '设置成功', icon: 'none', duration: 2000 })

            }
            return data
        },
        * fetchLogout({ payload }, { call, put }) {
            let msg = yield call(Api.logout, payload)
            if (msg) {
                Storage.getInstance().setLoginState(msg.is_login) // is_login 2=>退出登录
                Storage.getInstance().setToken(msg.token)
                // global.getInstance().userInfo = {}
                global.userInfo = {}

            }
        },
        * fetchCheckisregister({ payload }, { call, put }) {
            let data = yield call(Api.checkisregister, payload)
            return data
        },
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload };
        },
    },

};
