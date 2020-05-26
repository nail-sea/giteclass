import { PureComponent } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { stdConfig } from '@/utils/common'
import './index.scss'
const BASE = 'com-detail__buy-rent-house'
export default function BuyRentHouseDetail(props) {
  const { data = {} } = props
  const { primary_category,second_category, extend = {} } = data
  const { finish_status = '不详', room_hall_bathroom = '不详', area = '不详' } = extend
  const getAreaTitle = () => {
    return (second_category === '1' || second_category === '2') ? '房源面积' : '期望面积'
  }
  const getRoomTitle = () => {
    return (second_category === '1' || second_category === '2') ? '户型' : '期望户型'

  }
  const getFinishStatus = () => {
    return stdConfig.getData(primary_category, 'finish_status', finish_status) || '不详'
  }
  return (
    <View className={`${BASE}__info`}>
      <View className={`${BASE}__info__item`}>
        <Text className={`${BASE}__info__item__text ${BASE}__info__item__text--primary`}>{area}㎡</Text>
        <Text className={`${BASE}__info__item__text`}>{getAreaTitle()}</Text>
      </View>
      <View className={`${BASE}__info__line`} />
      <View className={`${BASE}__info__item`}>
        <Text className={`${BASE}__info__item__text ${BASE}__info__item__text--primary`}>{room_hall_bathroom}</Text>
        <Text className={`${BASE}__info__item__text`}>{getRoomTitle()}</Text>
      </View>
      <View className={`${BASE}__info__line`} />
      <View className={`${BASE}__info__item`}>
        <Text className={`${BASE}__info__item__text ${BASE}__info__item__text--primary`}>{getFinishStatus()}</Text>
        <Text className={`${BASE}__info__item__text`}>装修情况</Text>
      </View>
    </View>
  )
}
BuyRentHouseDetail.options = {
  addGlobalClass: true
}