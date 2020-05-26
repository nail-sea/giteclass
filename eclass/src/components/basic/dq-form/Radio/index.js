import Taro, { Component ,useContext } from '@tarojs/taro'
import { View, Text, Radio, Label } from '@tarojs/components'
import IconFont from '@/components/iconfont'
import FormContext from '../context'
import '../index.scss'
const BASE = 'dq-form'
const RADIO = 'dq-form__radio'
export default class FormRadio extends Component {
	static contextType = FormContext
	static options = {
		addGlobalClass: true
	}
	static defaultProps = {
		label: '标题',
		onChange: () => { },
		checked: false,
		selected: false//默认一个选择
	}
	componentDidMount() {
		let { selected, value, name } = this.props
		if(selected){
			if (this.context && name) {
				this.context.dispatch({
					type: 'change', payload: { name, value }
				})
			}
		}
	}
	_onClick = () => {
		let { onChange, value, name, checked } = this.props
		if (!checked) {
			if (this.context && name) {
				this.context.dispatch({
					type: 'change', payload: { name, value }
				})
			}
			onChange && onChange(value)
		}
	}

	_isChecked = () => {
		let { checked, value, name } = this.props
		if (this.context && name) {
			checked = this.context.state[name] === value
		}
		return checked
	}

	render() {
		const {label} = this.props
		return (
			<View className={`${BASE} ${RADIO}__container`} onClick={this._onClick}>
				<IconFont
					name="icon_choose"
					color={this._isChecked() ? '#f87c6a' : '#bbb'}
					size={30}
				/>
				<Text className={`${BASE} ${RADIO}__label`}>{label}</Text>
			</View>
		)
	}
}
// function FormRadio(props) {
// 	const formContext = useContext(FormContext)
// 	const defaultProps = {
		
// 	}
// 	const _props = Object.assign({}, defaultProps, props)

// 	const onClick = () => {
// 		if (!_props.checked) {
// 			let { onChange, value, name } = _props
// 			if (formContext) {
// 				formContext.dispatch({
// 					type: 'change',payload: {name, value}
// 				})
// 			}
// 			onChange && onChange(value)
// 		}
// 	}

// 	const isChecked = () => {
// 		let {checked, value, name} = _props
// 		if (formContext) {
// 			checked = formContext.state[name] === value
// 		}
// 		return checked
// 	}

// 	const { label } = _props
// 	return (
// 		<View className={`${BASE} ${RADIO}__container`} onClick={onClick}>
// 			<IconFont
// 				name="icon_choose"
// 				color={isChecked() ? '#f87c6a' : '#bbb'}
// 				size={30}
// 			/>
// 			<Text className={`${BASE} ${RADIO}__label`}>{label}</Text>
// 		</View>
// 	)
// }
// FormRadio.options = {
// 	addGlobalClass: true
// }
// export default FormRadio
