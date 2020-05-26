import Taro, { Component, useContext , useState} from '@tarojs/taro'
import { Input, View, Text } from '@tarojs/components'
import FormContext from '../context'
import IconFont from '@/components/iconfont'
import '../index.scss'
import { stopPropagation } from '@/utils/common'
import { scrollTop } from "@/utils/style";
const BASE = 'dq-form'
const INPUT = 'dq-form__input'
export default class FormInput extends Component {
	static contextType = FormContext
	static options = {
		addGlobalClass: true
	}
	static defaultProps = {
		placeholderColor: '#999',
		password: false,
		placeholder: '',
		onFocus: () => { },
		onBlur: () => { },
		onInput: () => { },
		type: 'text',
		value:  '',
		disabled: false,
		maxLength: 140,
		confirmType: 'done',
		focus: false,
		textAlign:'left',
		defaultValue: null
	}

	componentWillMount(){
		const { defaultValue } = this.props
		if(defaultValue){
			this._onChange({detail:{value:defaultValue}})
		}
	}

	componentWillReceiveProps(nextProps){
		if(this.props.defaultValue !== nextProps.defaultValue){
			this._onChange({detail:{value:nextProps.defaultValue}})
		}
	}

	_onChange = ({ detail: { value }}) => {
		let { name , onInput} = this.props
		if (this.context && name) {
			this.context.dispatch({
				type: 'change',
				payload: { name, value }
			})
		}
		onInput && onInput(value)
	}

	_onFocus = (e) => {
		const {onFocus} = this.props
		if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
			this.input.inputRef.scrollIntoViewIfNeeded({
				behavior:'smooth',
				block:'end'
			})
		}
		onFocus && onFocus(e)
	}

	_onBlur = (e) => {
		const { onBlur } = this.props
		scrollTop()
		onBlur && onBlur(e)
	}

	_clear = (e) => {
		stopPropagation(e)
		this._onChange({detail: { value:'' }})
	}

	getValue = () => {
		const {value,name} = this.props
		if (this.context && this.context.state && name) {
			return this.context.state[name]
		}
		return value
	}

	setValue = value => {
		this._onChange(value)
	}

	getInputClassName = () => {
		const {textAlign} = this.props
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
			onBlur,
			extra,
		} = this.props
		const value = this.getValue()
		return (
			<View className={`${BASE} ${INPUT}-container`}>
				<View className={`${BASE} ${INPUT}__content`}>
					<Input
						ref={ref => this.input = ref}
						value={value}
						type={type}
						password={password}
						placeholder={placeholder}
						disabled={disabled}
						maxLength={maxLength}
						focus={focus}
						confirmType={confirmType}
						onInput={this._onChange}
						onFocus={this._onFocus}
						onBlur={this._onBlur}
						placeholderStyle={`color: ${placeholderColor}`}
						className={this.getInputClassName()}
						cursorSpacing={100}
					/>
					{value ? (
						<View className={`${BASE} ${INPUT}__clear`} onClick={this._clear}>
							<IconFont name="icon_zhaopianshanchu" size={30} />
						</View>
					) : null}
				</View>
				{extra ? <Text className={`${BASE} ${INPUT}__text`}>{extra}</Text> : null}
			</View>
		)
	}
}