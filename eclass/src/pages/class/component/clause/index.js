import Taro, { Component } from "@tarojs/taro"
import { View, Text } from "@tarojs/components"
import IconFont from "@/components/iconfont";
import './index.scss'
import Dq from "@/config/Dq";
const BASE = "dq-class-clause"
export default function ClassClause(props) {
  const { checked, onChange } = props
  const gotoNotice = () => {
    Dq.navigateTo({
      url: '/pages/release/notice/index'
    })
  }
  const gotoECoinService = () => {
    Dq.navigateTo({
      url: '/pages/release/eCoinService/index'
    })
  }
  return (
    <View className={`${BASE}`}>
      <View className={`${BASE}__title`}>
        <Text className={`${BASE}__title__text`}>发布条款</Text>
      </View>
      <View className={`${BASE}__content`}>
        <View onClick={onChange} className={`${BASE}__content__wrap`}>
          <IconFont
            name={checked?'duihao_selected':'duihao_default'}
            size={40}
          />
          <Text className={`${BASE}__content__text`}>已阅读，并同意</Text>
        </View>
        <Text className={`${BASE}__content__btn`} onClick={gotoNotice}>
          【发布须知】
        </Text>
        <Text className={`${BASE}__content__btn`} onClick={gotoECoinService}>
          【E币服务协议】
        </Text>
      </View>
    </View>
  )
}