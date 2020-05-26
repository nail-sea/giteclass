import Taro, { Component, useContext } from '@tarojs/taro'
import { View, Text, Picker as TaroPicker } from '@tarojs/components'
import { TouchableOpacity } from 'react-native';
import FormContext from '../context'
import '../index.scss'
const BASE = 'dq-form'
const PICKER = 'dq-form__picker'
function DatePicker(props) {
	const formContext = useContext(FormContext)
	const defaultProps = {
		defaultLabel: '选择时间',
		mode: 'date', //date, time
		onCancel: () => { },
		disabled: false,
		value: null,
		onChange: () => { }
	}

	const _props = Object.assign({}, defaultProps, props)
	const onChange = ({ detail: { value } }) => {
		const { onChange, name } = _props
		if (formContext && name) {
			formContext.dispatch({
				type: 'change', payload: { name, value }
			})
		}
		onChange && onChange(value)
	}

	const getDefaultStart = () => {
		const { mode } = _props
		return {
			date: '1970-01-01',
			time: '00:00'
		}[mode]
	}

	const getDefaultEnd = () => {
		const { mode } = _props
		return {
			date: '2999-01-01',
			time: '23:59'
		}[mode]
	}

	const getValue = () => {
		let { value, name } = _props
		if (formContext && formContext.state && name) {
			value = formContext.state[name]
		}
		return value
	}

	const getComparableDateValue = (_value) => {
		const { mode } = _props
		return mode === 'date'
			? _value
			: `1970/01/01 ${_value}`
	}

	const getStart = () => {
		const { start } = _props
		return start || getDefaultStart()
	}

	const getEnd = () => {
		const { end } = _props
		return end || getDefaultEnd()
	}

	const getShowValue = () => {
		let value = getValue()
		const start = getStart()
		const end = getEnd()
		const _value = new Date(getComparableDateValue(value))
		const _start = new Date(getComparableDateValue(start))
		const _end = new Date(getComparableDateValue(end))
		if (_value < _start) {
			onChange({ detail: { value: start } })
			value = start
		}
		if (_value > _end) {
			onChange({ detail: { value: end } })
			value = end
		}
		return value
	}

	const renderText = () => {
		const { value, defaultLabel, name } = _props
		let trueValue = value
		if (formContext && name) {
			trueValue = formContext.state[name]
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
	const { mode, onCancel, disabled } = _props
	const _value = getShowValue()
	return (
		<View className={`${BASE} ${PICKER}`}>
			<TaroPicker
				mode={mode}
				start={getStart()}
				end={getEnd()}
				value={_value}
				onCancel={onCancel}
				disabled={disabled}
				onChange={onChange}
			>
				<TouchableOpacity>
					<View className={`${BASE} ${PICKER}__content`}>
						{renderText()}
					</View>
				</TouchableOpacity>
			</TaroPicker>
		</View>
	)
}

export default DatePicker
