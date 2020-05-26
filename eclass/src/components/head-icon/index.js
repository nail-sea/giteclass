import Taro, { Component, PureComponent } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'
import { STATIC_ASSETS } from '../../config'

export default class HeadIcon extends PureComponent {
  static defaultProps = {
    src: ''
  }
  render () {
    const { src } = this.props
    const file = src.length <= 0 ? STATIC_ASSETS('images/icon/img_morentouxiang.png') : src;
    return (
      <View className='head-icon'>
        <Image className='head-icon__img' src={file} />
      </View>
    )
  }
}
