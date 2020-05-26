import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import {
	TextInput,
	Platform,
	TouchableOpacity,
	KeyboardAvoidingView
} from 'react-native'
import FormContext from '../context'
import IconFont from '@/components/iconfont'
import '../index.scss'
const BASE = 'dq-form'
const INPUT = 'dq-form__input'
const keyboardTypeMap = {
	text: 'default',
	number: 'numeric',
	idcard: 'default',
	digit: Platform.select({
		ios: 'decimal-pad',
		android: 'numeric'
	})
}
export default class FormInput extends Component {
	static contextType = FormContext
	static defaultProps = {
		placeholderColor: '#999',
		password: false,
		placeholder: '',
		onFocus: () => {},
		onBlur: () => {},
		onInput: () => {},
		type: 'text',
		value: '',
		disabled: false,
		maxLength: 140,
		confirmType: 'done',
		focus: false,
		textAlign: 'left'
	}

	_onChange = (value) => {
		let { name, onInput } = this.props
		if (this.context.state && name) {
			this.context.dispatch({
				type: 'change',
				payload: { name, value }
			})
		}
		onInput && onInput(value)
	}

	_onBlur = () => {
		const value = this.getValue()
		const {onBlur} = this.props
		onBlur && onBlur({detail:{value}})
	}

	_clear = () => {
		this._onChange('')
	}

	getValue = () => {
		const { value, name } = this.props
		if (this.context && this.context.state && name) {
			return this.context.state[name]
		}
		return value
	}

	setValue = (value) => {
		this._onChange(value)
	}

	getInputClassName = () => {
		const { textAlign } = this.props
		return `${BASE} ${INPUT} ${INPUT}--align-${textAlign}`
	}

	render() {
		const {
			type,
			password,
			placeholder,
			placeholderColor,
			disabled,
			maxLength,
			focus,
			confirmType,
			onFocus,
			onBlur,
			extra
		} = this.props
		const keyboardType = keyboardTypeMap[type]
		const value = this.getValue()
		return (
			<KeyboardAvoidingView
				className={`${BASE} ${INPUT}-container`}
				behavior={Platform.select({
					ios: 'padding',
					android: undefined
				})}
			>
				<View className={`${BASE} ${INPUT}__content`}>
					<TextInput
						ref={(ref) => (this.input = ref)}
						value={value}
						keyboardType={keyboardType}
						secureTextEntry={!!password}
						placeholder={placeholder}
						editable={!disabled}
						maxLength={maxLength}
						autoFocus={!!focus}
						returnKeyType={confirmType}
						onChangeText={this._onChange}
						onFocus={onFocus}
						onBlur={this._onBlur}
						placeholderTextColor={placeholderColor}
						className={this.getInputClassName()}
						underlineColorAndroid="transparent"
						className={`${BASE} ${INPUT}`}
					/>
					{value ? (
						<TouchableOpacity
							className={`${BASE} ${INPUT}__clear`}
							onPress={this._clear}
						>
							<IconFont name="icon_shanmima" size={40} />
						</TouchableOpacity>
					) : null}
				</View>
				{extra ? (
					<Text className={`${BASE} ${INPUT}__text`}>{extra}</Text>
				) : null}
			</KeyboardAvoidingView>
		)
	}
}
