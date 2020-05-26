import Taro from "@tarojs/taro";
export default {
  calcSize(size: number | string) {
    if (typeof size === 'string') {
      return size
    }
    if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
      return `${size}rpx`
    }
    const DESIGN_WIDTH = 750
    const {screenWidth} = Taro.getSystemInfoSync()
    return size * screenWidth / DESIGN_WIDTH
  },
  omit(obj:object, omitList:string[]){
    if (typeof obj !== 'object') return obj
    const data = {}
    const hasOwnProperty = Object.prototype.hasOwnProperty
    for (const key in obj) {
      if (hasOwnProperty.call(obj,key) && !omitList.includes(key)) {
        data[key] = obj[key]        
      }
    }
    return data
  },
  isNil(value) {
  if (typeof value === 'number') return false
  return !value || Object.keys(value).length === 0
}
}