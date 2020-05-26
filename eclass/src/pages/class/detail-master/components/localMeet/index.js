import { PureComponent } from '@tarojs/taro'
import { View, Text } from "@tarojs/components";
import times from "@/utils/times";

import './index.scss'

const BASE = 'com-detail-localmeet'
export default class LocalMeetDetail extends PureComponent {
  shouldComponentUpdate() {
    return false
  }

  getSexLimit = (sex) => {
    const sexLimit = {
      1: '仅限男生',
      2: '仅限女生',
    }
    return sexLimit[sex] || '性别不限'
  }

  render() {
    const { data = {} } = this.props
    const { extend = {} } = data
    const { start_time, end_time, sex } = extend
    return (
      <View className={`${BASE}__list`}>
        {start_time && end_time ? (
          <View className={`${BASE}__list__item`}>
            <Text className={`${BASE}__list__item__text`}>{`${times.getRelativeDate(start_time)} - ${times.getRelativeDate(end_time)}`}</Text>
          </View>
        ) : null}
        {sex ? (
          <View className={`${BASE}__list__item`}>
            <Text className={`${BASE}__list__item__text`}>{this.getSexLimit(sex)}</Text>
          </View>
        ) : null}
      </View>
    )
  }
}