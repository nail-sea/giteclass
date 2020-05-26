import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { TextInput, Platform, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import FormContext from '../context'
import IconFont from '@/components/iconfont'
import '../index.scss'
const BASE = 'dq-form'
const TEXTAREA = 'dq-form__textarea'

class Textarea extends Component {
	static contextType = FormContext
	static defaultProps = {
		placeholderColor: '#999',
		maxLength:140,
	}
	state = {}

	componentDidMount() {
		if (this.props.focus) {
			this.input.focus()
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.focus !== nextProps.focus && nextProps.focus) {
			this.input.focus()
		}
	}

	shouldComponentUpdate(nextProps) {
		const { value, defaultValue } = this.props
		return (
			Platform.OS !== 'ios' ||
			(value === nextProps.value && !nextProps.defaultValue) ||
			(defaultValue === nextProps.defaultValue && !nextProps.value)
		)
	}

	onChange = value => {
		const { onChange, name} = this.props
		this.context.dispatch({
			type:'change', payload: {name, value}
		})
		onChange && onChange(value)
	}

	clear = () => {
		const { onChange, name } = this.props
		this.context.dispatch({
			type:'change',payload: {name, value:''}
		})
		onChange && onChange('')
	}

	getValue = () => {
    const {name, value} = this.props
    return (this.context.state || {})[name] || value || ''
  }
	render() {
		const {
			password,
			placeholder,
			placeholderColor,
			disabled,
			maxLength,
			focus,
			confirmType,
			onFocus,
			onBlur,
		} = this.props
		const value = this.getValue()
		return (
			<View className={`${BASE} ${TEXTAREA}-container`}>
				<KeyboardAvoidingView
					behavior={Platform.select({
						ios: 'padding',
						android: undefined
					})}
					style={{ flex: 1 }}
				>
					<View className={`${BASE} ${TEXTAREA}__content`}>
						<TextInput
							multiline
							ref={(ref) => (this.input = ref)}
							value={value}
							secureTextEntry={!!password}
							placeholder={placeholder}
							editable={!disabled}
							maxLength={maxLength}
							autoFocus={!!focus}
							returnKeyType={confirmType}
							onChangeText={this.onChange}
							onFocus={onFocus}
							onBlur={onBlur}
							placeholderTextColor={placeholderColor}
							className={`${BASE} ${TEXTAREA}`}
							underlineColorAndroid="transparent"
							className={`${BASE} ${TEXTAREA}`}
						/>
						{value? (
							<TouchableOpacity className={`${BASE} ${TEXTAREA}__clear`} onPress={this.clear}>
								<IconFont name="icon_shanmima" size={40} />
							</TouchableOpacity>
						): null}
					</View>
				</KeyboardAvoidingView>
			</View>
		)
	}
}

export default Textarea
