import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './button.scss'
const BASE = 'dq-button'

class DqButton extends PureComponent {
	static options = {
		addGlobalClass:true
	}
  static defaultProps = {
	onClick: () => {},
	onLongPress: () => {},
	disabled: false,
    type: 'primary', //primary , cancel,  ghost
    textColor:null,
    containerStyle:null,
	size:'normal', //nomal , large, small
	renderLabel: null
  }

  typeList = ['primary', 'cancel', 'ghost']
  sizeList = ['normal', 'large', 'small']

	_getContainerClassName = () => {
		let { type, size, disabled } = this.props
		type = this.typeList.includes(type) ? type : typeList[0]
		size = this.sizeList.includes(size) ? size : sizeList[0]
		return `${BASE}__container ${BASE}__container--${disabled
			? `${type}--disabled`
			: type} ${BASE}__container--${size}`
	}

	_getTextClassName = () => {
		let { type, size, disabled } = this.props
		type = this.typeList.includes(type) ? type : typeList[0]
		size = this.sizeList.includes(size) ? size : sizeList[0]
		return `${BASE}__text ${BASE}__text--${disabled
			? `${type}--disabled`
			: type} ${BASE}__text--${size}`
	}
	render() {
		const { children , disabled, label, onClick, containerStyle, renderLabel} = this.props
		return (
				<Button disabled={disabled} onClick={onClick} plain style={{border:'none', display:'flex', padding:0,width:'100%'}} hoverClass={disabled? null:`${BASE}__container--active`}>
					<View className={this._getContainerClassName()} style={containerStyle}>
						{renderLabel&&<View style={{marginRight:10}}>{renderLabel} </View>}
						<Text className={this._getTextClassName()}>{label}</Text>
					</View>
				</Button>
		)
	}
}

export default DqButton
