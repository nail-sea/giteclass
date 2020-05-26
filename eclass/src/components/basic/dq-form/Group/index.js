import Taro, { useState, useContext } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import FormContext from '../context'
import FormRadio from '../Radio'
import '../index.scss'
const BASE = 'dq-form'
const GROUP = 'dq-form__radio__group'
function Group(props) {
	const formContext = useContext(FormContext)
	const defaultProps = {
		radios: []
	}
	const _props = Object.assign({}, defaultProps, props)
	const [ value, setValue ] = useState(null)

	const onItemChange = (value) => {
		const {name, onChange} = _props
		setValue(value)
		if (formContext) {
			formContext.dispatch({
				type: 'change',payload: {name, value}
			})
		}
		onChange && onChange(value)
	}
	const { radios } = _props
	return (
		<View className={`${BASE} ${GROUP}`}>
			{radios.map((item, index) => (
				<FormRadio key={`radio-item-${index}`} value={item.value} onChange={onItemChange} checked={item.value === value} label={item.label} />
			))}
		</View>
	)
}
Group.options = {
	addGlobalClass: true
}
export default Group
