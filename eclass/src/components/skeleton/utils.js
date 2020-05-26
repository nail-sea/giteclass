import Taro from "@tarojs/taro";
export default {
  calcSize:function(size: number) {
    if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
      return `${size}rpx`
    }
    const DESIGN_WIDTH = 750
    const {screenWidth} = Taro.getSystemInfoSync()
    return size * screenWidth / DESIGN_WIDTH
  }
}