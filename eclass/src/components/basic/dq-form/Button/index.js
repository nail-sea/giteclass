import Taro, { useContext } from '@tarojs/taro'
import { View } from '@tarojs/components'
import FormContext from '../context'
import { BasicButton } from '@/components'
import '../index.scss'
const BASE = 'dq-form'
const BUTTON = 'dq-form__button'

export default function FormButton(props) {
	const defaultProps = {
		onClick: () => {}
	}
	const formContext = useContext(FormContext)
	function onButtonClick() {
		const {onClick} = props
		formContext && formContext.submit.call(this)
		onClick && onClick()
	}

	const _props = Object.assign({}, defaultProps, props)
	const { disabled, label } = _props
	const {children} = props
	return (
		<View className={`${BASE} ${BUTTON}`}>
			<BasicButton disabled={disabled} onClick={onButtonClick} label={label} size="large">
				{children}
			</BasicButton>
		</View>
	)
}

FormButton.options = {
	addGlobalClass: true
}
