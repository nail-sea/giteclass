import Taro, { Component, PureComponent } from '@tarojs/taro'
import { View, Text, Image} from '@tarojs/components'
import './index.scss'
import { STATIC_ASSETS } from '../../config'


export default class NoData extends PureComponent {
  static defaultProps = {
    title:'',
    imgSrc:'',
    tips: '暂无数据',
    isShowTit: true
  }

  render () {
    const { imgSrc, tips, title, isShowTit } = this.props
    return (
      <View className='nodata-continer'>
        {isShowTit && <View className='nodata-continer__title'>
          <Text>{title}</Text>
        </View>}
        <View className='nodata-continer__img'>
          <Image className='nodata-continer__img__img' src={imgSrc || STATIC_ASSETS('images/icon/nodata.png')}/>
        </View>
        <View className='nodata-continer__tips'>
          <Text>{tips}</Text>
        </View>
        <View className='nodata-continer__layout'>
          {this.props.children}
        </View>
      </View>
    )
  }
}
