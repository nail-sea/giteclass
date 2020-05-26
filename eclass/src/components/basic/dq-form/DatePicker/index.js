import Taro, { Component, useContext } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import FormContext from '../context'
import '../index.scss'
const BASE = 'dq-form'
const PICKER = 'dq-form__picker'
function pad(value){
	value = Number(value)
	if (value < 10) {
		value = `0${value}`
	}
	return value + ''
}
class DatePicker extends Component {
	static defaultProps = {
		defaultLabel: '选择时间',
		mode: 'date', //date, time
		onCancel: () => { },
		disabled: false,
		value: null,
		fields: 'day'
	}
	static options = {
		addGlobalClass: true
	}
	static contextType = FormContext

	formatValue = value => {
		if (this.props.mode === 'time') {
			return value
		}
		return value.split('-').map(pad).join('-')

	}

	onChange = ({ detail: { value } }) => {
		const { onChange, name } = this.props
		value = this.formatValue(value)
		if (this.context && this.context.dispatch && name) {
			this.context.dispatch({
				type: 'change', payload: { name, value }
			})
		}
		onChange && onChange(value)
	}

	getDefaultStart = () => {
		const { mode } = this.props
		return {
			date: '1970-01-01',
			time: '00:00'
		}[mode]
	}

	getDefaultEnd = () => {
		const { mode } = this.props
		return {
			date: '2999-01-01',
			time: '23:59'
		}[mode]
	}

	renderText = () => {
		const { value, defaultLabel, name } = this.props
		let trueValue = value
		if (this.context && this.context.state && name) {
			trueValue = this.context.state[name]
		}
		return trueValue ? (
			<Text className={`${BASE} ${PICKER}__content__text`}>{trueValue}</Text>
		) : (
				<Text
					className={`${BASE} ${PICKER}__content__text ${PICKER}__content__text--default`}
				>
					{defaultLabel}
				</Text>
			)
	}

	getComparableDateValue = (_value) => {
		const { mode } = this.props
		return mode === 'date'
			? _value
			: `1970/01/01 ${_value}`
	}

	getValue = () => {
		let { value, name } = this.props
		if (this.context && this.context.state && name) {
			value = this.context.state[name]
		}
		return value
	}

	getStart = () => {
		const { start } = this.props
		return start || this.getDefaultStart()
	}

	getEnd = () => {
		const { end } = this.props
		return end || this.getDefaultEnd()
	}

	getShowValue = () => {
		let value = this.getValue()
		const start = this.getStart()
		const end = this.getEnd()
		const _value = new Date(this.getComparableDateValue(value))
		const _start = new Date(this.getComparableDateValue(start))
		const _end = new Date(this.getComparableDateValue(end))
		if (_value < _start) {
			this.onChange({ detail: { value: start } })
			value = start
		}
		if (_value > _end) {
			this.onChange({ detail: { value: end } })
			value = end
		}
		return value
	}

	render() {
		const { mode, onCancel, disabled, fields } = this.props
		const _value = this.getShowValue()
		return (
			<View className={`${BASE} ${PICKER}`}>
				<Picker
					fields={fields}
					mode={mode}
					start={this.getStart()}
					end={this.getEnd()}
					value={_value}
					onCancel={onCancel}
					disabled={disabled}
					onChange={this.onChange}
				>
					<View className={`${BASE} ${PICKER}__content`}>
						{this.renderText()}
					</View>
				</Picker>
			</View>
		)
	}
}
export default DatePicker
