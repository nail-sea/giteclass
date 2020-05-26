import Taro, { Component, PureComponent } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import IconFont from '@/components/iconfont'
import { SafeAreaView } from 'react-native'
import PropTypes from 'prop-types'
import './index.scss'
import classnames from 'classnames'

export default class TitleBar extends PureComponent {
	handleBackClick = () => {
		if (this.props.customBack) {
			this.props.handleBack()
		} else {
			Taro.navigateBack({ delta: 1 })
		}
	}

	render() {
		const { title, is_back, isRecharge, customBack , hideBottomBorder} = this.props
		return (
      <SafeAreaView style={{backgroundColor:'#fff'}}>
        <View className="title-bar">
        <View className={classnames('title-bar-bg', {'title-bar-bg--no-bottom-border':hideBottomBorder})}>
            {is_back ? (
              <View
                className="title-bar-bg__back"
                onClick={this.handleBackClick.bind(this)}
              >
                <IconFont
                  name="ic_back"
                  size={32}
                  style={{ 'margin-top': '2px' }}
                  color="#424242"
                />
                <Text className="title-bar-bg__back__text">返回</Text>
              </View>
            ) : null}
            <Text className="title-bar-bg__text" numberOfLines={1}>
              {' '}
              {title}
            </Text>
            {isRecharge ? (
              <View className="title-bar-bg__recharge">
                <Text>{` `}</Text>
                <IconFont name="ic_zhuanfa" size={30} />
                <Text>充值</Text>
              </View>
            ) : null}
          </View>
        </View>
      </SafeAreaView>
		)
	}
}

TitleBar.defaultProps = {
	title: '主页',
	is_back: true,
	isRecharge: false,
  customBack: false,
  hideBottomBorder:false,
}

TitleBar.propTypes = {
	title: PropTypes.string,
	is_back: PropTypes.bool,
	isRecharge: PropTypes.bool,
	customBack: PropTypes.bool
}
