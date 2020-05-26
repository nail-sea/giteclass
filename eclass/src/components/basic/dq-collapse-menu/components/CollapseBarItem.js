import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import IconFont from '@/components/iconfont'
import '../index.scss'
class CollapseBarItem extends PureComponent {
	static defaultProps = {
		value: 0,
		onChange: () => {},
		data: {
			label: 'label',
			value: 0,
			defaultValue: 0,
			options: [ { label: 'option1', value: 0 } ]
		},
		active: false
	}

	_onClick = () => {
		const { active } = this.props
		const { data, onChange } = this.props
		onChange && onChange(data, !active)
	}

	_getLabel = () => {
		const { value, data } = this.props
		if (value === data.defaultValue || value === undefined) return data.label
		return data.options.find((item) => item.value === value).label
	}

	_isTextActive = () => {
		const { value, data, active } = this.props
		return active || value !== data.defaultValue
	}

	_getIconProps = () => {
		return this.props.active
			? { name: 'icon_shouqi', color: '#f87c6a' }
			: { name: 'icon_zhankai', color: '#747474' }
	}

	render() {
		return (
			<View className="dq-collapse-menu__bar__item" onClick={this._onClick}>
				<Text
					className={`dq-collapse-menu__bar__item__text${this._isTextActive()
						? '--active'
						: ''}`}
				>
					{this._getLabel()}
				</Text>
				<IconFont size={50} {...this._getIconProps()} />
			</View>
		)
	}
}

export default CollapseBarItem
