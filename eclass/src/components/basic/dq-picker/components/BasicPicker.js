import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker, Input } from '@tarojs/components'
import IconFont from '@/components/iconfont'
import ProtoPicker from './ProtoPicker'
import DqTouchable from '../../dq-touchable'
import '../index.scss'
class BasicPicker extends ProtoPicker {
	constructor(props) {
		super(props)
	}

	componentDidMount() {}

	renderSelectorValue = () => {
		let { selector, value, defaultLabel } = this.props
		value = Number(value)
		const hasValue = value > -1 && selector.length > 0
		const activeItem = selector.filter((item, index) => index === value)[0]
		return (
			<Text
				className={`dq-picker__show-sel__label__text ${hasValue
					? ''
					: 'colA0A0A0'}`}
			>
				{(activeItem && activeItem.name) || defaultLabel}
			</Text>
		)
	}

	renderTimeValue = () => {
		const { value, defaultLabel } = this.props
		return (
			<Text
				className={`dq-picker__show-sel__label__text ${value
					? ''
					: 'colA0A0A0'}`}
			>
				{value || defaultLabel}
			</Text>
		)
	}
	//TODO
	renderMultiValue = () => {return <View />}

	renderRegionValue = () => {return <View/>}

	render() {
		const {
			selector,
			isIcon,
			classN,
			start,
			end,
			value,
			onCancel,
			disabled,
			onColumnChange,
			fields,
			mode
		} = this.props

		return (
			<Picker
				start={start}
				end={end}
				value={value}
				onCancel={onCancel}
				disabled={disabled}
				onColumnChange={onColumnChange}
				fields={fields}
				range={selector}
				rangeKey="name"
				onChange={this.onChange}
			>
				<DqTouchable>
					<View className={'dq-picker__show-sel' + classN}>
						<View className="dq-picker__show-sel__label">
							{mode === 'selector' && this.renderSelectorValue()}
							{mode === 'date' && this.renderTimeValue()}
							{mode === 'time' && this.renderTimeValue()}
							{mode === 'multiSelector' && this.renderMultiValue()}
							{mode === 'region' && this.renderRegionValue()}
						</View>
						{isIcon && (
							<View className="dq-picker__show-sel__icon">
								<IconFont
									className="dq-form-continer__item__icon"
									name="ic_zhankai"
									color={'#c8c8c8'}
									size={50}
								/>
							</View>
						)}
					</View>
				</DqTouchable>
			</Picker>
		)
	}
}

export default BasicPicker
