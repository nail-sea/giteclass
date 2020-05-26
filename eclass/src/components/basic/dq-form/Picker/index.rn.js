import Taro, { Component, useContext, useState } from '@tarojs/taro'
import AntPicker from '@ant-design/react-native/lib/picker'
import { View, Text } from '@tarojs/components'
import { TouchableOpacity } from 'react-native'
import FormContext from '../context'
import '../index.scss'
import * as utils from '../utils'

const BASE = 'dq-form'
const PICKER = 'dq-form__picker'
export default class FormPicker extends Component {
	static contextType = FormContext
	static defaultProps = {
		col: 1,
		value: [],
		defaultValue: [],
		range: [],
		multiple: false,
		defaultLabel: '请选择',
		onChange: () => {}
	}

	componentDidMount() {
		this._initValue()
	}
	_initValue = (props = this.props) => {
		const { defaultValue, onChange, name } = props
		const trueValue = this._getValue(props)
		let _value = !utils.isNil(trueValue) ? trueValue : defaultValue
		if (!utils.isNil(_value)) {
			this._onChange(_value)
		}
	}

	_onChange = (newValue) => {
		const { name, onChange } = this.props
		if (newValue.length === 1) {
			newValue = newValue[0]
		}
		if (this.context && this.context.dispatch && name) {
			this.context.dispatch({
				type: 'change',
				payload: { name, value: newValue }
			})
		}
		onChange && onChange(newValue)
	}

	_getValue = (props = this.props) => {
		const { value, name } = this.props
		let trueValue = value
		if (this.context && this.context.state && name) {
			trueValue = this.context.state[name]
		}
		if (!Array.isArray(trueValue) && !utils.isNil(trueValue)) {
			trueValue = [ trueValue ]
		}
		return trueValue
	}

	_getValueClassName = () => {
		const trueValue = this._getValue()
		return utils.isNil(trueValue)
			? `${BASE} ${PICKER}__content__text ${PICKER}__content__text--default`
			: `${BASE} ${PICKER}__content__text`
	}

	_getValueLabel = () => {
		const { defaultLabel, multiple, range } = this.props
		const trueValue = this._getValue()
		return utils.isNil(trueValue)
			? defaultLabel
			: utils.valuesToLabels(range, trueValue).join('; ')
	}

	render() {
		const {
			name,
			onCancel,
			disabled,
			multiple,
			range,
			col,
			defaultValue
		} = this.props
		const trueValue = this._getValue()
		return (
			<View className={`${BASE} ${PICKER}-container`}>
				<AntPicker
					name={name}
					data={range}
					cols={col}
					value={trueValue}
					onCancel={onCancel}
					disabled={disabled}
					onChange={this._onChange}
					defaultValue={defaultValue}
				>
					<TouchableOpacity>
						<View className={`${BASE} ${PICKER}__content`}>
							<Text className={this._getValueClassName()}>
								{this._getValueLabel()}
							</Text>
						</View>
					</TouchableOpacity>
				</AntPicker>
			</View>
		)
	}
}
