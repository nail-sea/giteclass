import Taro, { Component } from '@tarojs/taro'
import { validate } from './utils'
const noop = () => {}

export default function create(options) {
	return function(FormComponent) {
		return class FormWrapper extends Component {
			constructor(...props) {
				super(...props)
				this.state = {
					formData: {}
				}

				this.formRules = {}

				this._onItemChange = (name, onChange, value) => {
					const { formData } = this.state
					formData[name] = value
					this.setState({ formData })
					onChange && onChange(value)
				}

				this.form = {
					getFieldDecorator: (name, rules) => {
						return (element) => {
							const { onChange, ...restProps } = element.props
							this.formRules[name] = rules
							return Taro.cloneElement(
								element,
								{
									...restProps,
									value: this.state.formData[name],
									onChange: this._onItemChange.bind(
										this,
										name,
										element.props.onChange || noop
									)
								},
								element.props.children
							)
						}
					},
					validate: (callback) => {
						for (const name in this.formRules) {
							const rules = this.formRules[name]
							const value = this.state.formData[name]
							if (rules instanceof Array) {
								const errMsg = validate(rules, value, name)
								if (errMsg) {
									callback &&
										callback(
											{
												name,
												errMsg
											},
											{data:this.state.formData}
											
										)
									return Promise.reject({ name, errMsg })
								}
							}
						}
						callback && callback(null, {data:this.state.formData})
						return Promise.resolve({data:this.state.formData})
					}
				}
			}
			render() {
				return <FormComponent form={this.form} />
			}
		}
	}
}
