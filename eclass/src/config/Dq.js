import Taro from "@tarojs/taro";
import {NavigationActions, StackActions} from 'react-navigation'
const handlerMap = new Map()

const tabPages = [
  'pages/home/index', 
  'pages/notice/notice', 
  'pages/release/release', 
  'pages/shopStore/index', 
  'pages/user/user'
]
tabPages.includes = function(str){
  for (let index = 0; index < this.length; index++) {
    const element = this[index];
    const reg = new RegExp(`^\\S?${element}`,'i')
    if (reg.test(str)) {
      return true
    }
  }
  return false
}
tabPages.matchRoot = function(str){
  const reg = new RegExp(`^\\S?${this[0]}`,'i')
  return reg.test(str)
}

function redirectTo(params = {}) {
  if (tabPages.includes(params.url)) {
    return switchTab(params)
  }
  return Taro.redirectTo(params)
}

function navigateTo(params = {}) {
  if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP && Taro.getCurrentPages().length > 8) {
    return redirectTo(params)
  } 
  if(tabPages.includes(params.url)){
    return switchTab(params)
  }
  return Taro.navigateTo(params)
}

function switchTab(params = {}) {
  if(Taro.getEnv() === Taro.ENV_TYPE.RN && tabPages.matchRoot(params.url)){
    params.url = 'tab'
  }
  return Taro.switchTab(params)
}

handlerMap.set('redirectTo', redirectTo)

handlerMap.set('navigateTo', navigateTo)

handlerMap.set('switchTab',switchTab)

const proxyHandler = {
  get(target, key) {
    if (handlerMap.has(key)) {
      return handlerMap.get(key)
    }
    return target[key]
  },
  set(target, key, value) {
    throw Error('Dq class is unsetable !')
  }
}
const Dq = new Proxy(Taro, proxyHandler)

export default Dq