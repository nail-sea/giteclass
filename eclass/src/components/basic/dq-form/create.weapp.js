import Taro, { Component, useState } from '@tarojs/taro'
import { validate } from './utils'

export default function create(options) {
	return function(FormComponent) {
		return function FormWrapper(props) {
			const [ state, setState ] = useState({ formData: {} })
			let formRules = {}
			function onItemChange(name, onChange, value) {
				const { formData } = state
				formData[name] = value
				setState({ formData })
				onChange && onChange(value)
			}
			const form = {
				getFieldDecorator: (name, rules) => {
					return (element) => {
						const { onChange, ...restProps } = element.props
						formRules[name] = rules
						return Taro.cloneElement(
							element,
							{
								...restProps,
								value: state.formData[name],
								onChange: onItemChange.bind(this, name, onChange)
							},
							element.props.children
						)
					}
				},
				validate: (callback) => {
					for (const name in formRules) {
						const rules = formRules[name]
						const value = state.formData[name]
						if (rules instanceof Array) {
							const errMsg = validate(rules, value, name)
							if (errMsg) {
								callback && callback({ name, errMsg }, {data:state.formData})
								return Promise.reject({ name, errMsg })
							}
						}
					}
					callback && callback(null, {data:state.formData})
					return Promise.resolve({data:state.formData})
				}
			}

			return Taro.createElement(FormComponent, { form })
		}
	}
}

