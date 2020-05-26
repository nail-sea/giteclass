import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import {
	TouchableOpacity,
	TouchableNativeFeedback,
	Platform
} from 'react-native'
import './button.scss'
const BASE = 'dq-button'
class DqButton extends PureComponent {
	static defaultProps = {
		onClick: () => {},
		onLongPress: () => {},
		disabled: false,
    type: 'primary', //primary , cancel,  ghost
    textColor:null,
    containerStyle:null,
    size:'normal', //nomal , large, small
	}

	state = {}
  typeList = ['primary', 'cancel', 'ghost']
  sizeList = ['normal', 'large', 'small']

	_onPress = () => {
		const {onClick} = this.props
		onClick && onClick()
	}

  _onLongPress = () => {}
  
  _getContainerClassName = () => {
    let {type, size, disabled} = this.props
    type = this.typeList.includes(type)? type: typeList[0]
    size = this.sizeList.includes(size)? size: sizeList[0]
    return `${BASE}__container ${BASE}__container--${disabled? `${type}--disabled`:type} ${BASE}__container--${size}`
  }

  _getTextClassName = () => {
    let {type, size, disabled} = this.props
    type = this.typeList.includes(type)? type: typeList[0]
    size = this.sizeList.includes(size)? size: sizeList[0]
    return `${BASE}__text ${BASE}__text--${disabled? `${type}--disabled`:type} ${BASE}__text--${size}`
  }

	render() {
		const Touchable = Platform.select({
			ios: TouchableOpacity,
			android: TouchableNativeFeedback
		})
		const { children ,disabled, label} = this.props
		return (
			<Touchable activeOpacity={.6} onPress={this._onPress} onLongPress={this._onLongPress} disabled={disabled}>
				<View className={this._getContainerClassName()}>
					<Text className={this._getTextClassName()}>{children || label}</Text>
				</View>
			</Touchable>
		)
	}
}

export default DqButton
