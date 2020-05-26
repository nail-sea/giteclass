import Taro, { Component, PureComponent } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames'
import './index.scss'

export default class Tag extends PureComponent {
  static defaultProps = {
    text: '',
    type: ''
  }

  render () {
    const { text, type } = this.props
    return (
      <View className={classNames('commom-tag', `commom-tag__${type}`)}>
        <Text className={classNames('commom-tag__text', `commom-tag__${type}__text`)}>
          {text}
        </Text>
      </View>
    )
  }
}

