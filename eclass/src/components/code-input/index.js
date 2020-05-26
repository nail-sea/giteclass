import Taro, { Component, PureComponent } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { DqInput, DqCountdown ,TitleBar, FormInput} from '@/components'
import { connect } from '@tarojs/redux'
import Storage from '@/utils/storage'
import './index.scss'
import { formatStyle } from '../../utils/style'
import classNames from 'classnames'

@connect(({ loginRegister }) => ({
	...loginRegister
}))
class CodeInput extends PureComponent {
	constructor() {
		super(...arguments)
		this.state = {
			type: 'getAgain', //验证码的状态
			code: '' //验证码
		}
	}

	static defaultProps = {
		phone: '', //手机号
		fetchType: 'loginRegister/fetchGetVerifyCode',
		getCodeType: 'login',
		loadTips: '',
		onNext: () => {}
	}

	async handlegetCode() {
		this.setState({ code: '' })
		await this.props
			.dispatch({
				type: this.props.fetchType,
				payload: {
					type: this.props.getCodeType,
					mobile: this.props.phone
				}
			})
			.then((data) => {
				this.setState({ type: 'time' })
			})
			.catch((data) => {
				this.setState({ type: 'getAgain' })
			})
	}

	componentDidMount() {
		this.handlegetCode()
	}

	onGetCode = () => {
		this.handlegetCode()
	}

	handleState = (key, value) => {
		this.setState({ [key]: value })
	}

	handleInput = (value) => {
		this.setState({ code: value }, () => {
			if (value.length >= 6) {
				Taro.showLoading({
					title: this.props.loadTips
				}).then((res) => {
					Taro.hideLoading()
					this.props.onNext(this.state.code)
				})
			}
		})
	}

	handleTimeEnd = () => {
		this.setState({ type: 'getAgain' })
	}

	render() {
		const base_class = 'code-input'
		const text_class = 'code-input__con__code-input__show__text'
		const { type, code } = this.state
		const { phone } = this.props
		const codeArr = [ 0, 1, 2, 3, 4, 5 ]
		const mobile = String(phone).substr(0,3) + '****' + String(phone).substr(7);
		return (
			<View className={`${base_class}`}>
				<View className={`${base_class}__con`}>
					<View className={`${base_class}__con__word2`}>
						<Text className={`${base_class}__con__word2__text`}>输入验证码</Text>
					</View>
					<View className={`${base_class}__con__word3`}>
						<Text className={`${base_class}__con__word3__text`}>
							验证码已发送至
							<Text className={`${base_class}__con__word3__phone`}>
								+86{mobile}
							</Text>
						</Text>
					</View>
					<View className={`${base_class}__con__code-input`}>
						<View className={`${base_class}__con__code-input__show`}>
							{codeArr.map((item, index) => {
								const cur = item == (code.length - 1) ? "--current" : ""
								return (
									<View className={`${base_class}__con__code-input__show__text-wrap`}>
										<Text key={item} className={classNames(`${text_class}`, `${text_class}${cur}`)}>
											{code.charAt(item)}
										</Text>
									</View>
								)
							})}
						</View>
						<View className={`${base_class}__con__code-input__input`}>
							<FormInput 
								placeholder=''
								type='number'
								value={code}
								maxLength={6}
								focus={true}
								onInput={this.handleInput.bind(this)}
							/>
						</View>
					</View>

					<View className={`${base_class}__con__code`}>
						{type === 'time' && (
							<View className={`${base_class}__con__code__time`}>
								<DqCountdown
									seconds={60}
									timeType='seconds'
									onTimeEnd={this.handleTimeEnd.bind(this)}
									textStyle={formatStyle({
										// 'font-size': '32px',
										// color: '#a0a0a0'
									})}
								/>
								{/* <Text className={`${base_class}__con__code__text`}>后重新获取</Text> */}
							</View>
						)}
						{type === 'getAgain' && (
							<View
								className={`${base_class}__con__code__get-again`}
								onClick={this.onGetCode.bind(this)}
							>
								<Text className={`${base_class}__con__code__text`}>获取验证码</Text>
							</View>
						)}
					</View>
				</View>
			</View>
		)
	}
}
export default CodeInput;