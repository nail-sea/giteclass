import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { DqButton } from '@/components'
import { connect } from '@tarojs/redux'
import LRPhone from '../components/phone'
import LRCode from "../components/code";
import CodeInput from '@/components/code-input'
import decorator from '@/config/decorator'
import ENUM from '@/config/enum'
import Tips from '@/utils/tips'
import Dq from '@/config/Dq'
import Storage from '@/utils/storage'
import utils from '@/utils/utils'
import './index.scss'
import Platform from '@/platfrom'

@connect(({ Auth, loginRegister }) => ({
	...Auth,
	...loginRegister
}))
@decorator()
class WxLogin extends Component {
	constructor() {
		super(...arguments)
		this.state = {
			phone: '',
			errorPhone: '', //手机号错误提示
			formatPhone: true, //手机号未通过验证
			code: '',
			errorCode: '',
			formatCode: true, 
			isShowCode: false,
			isBindPhone: true, //是否已绑定手机-----------------初始化为true
			authorize_: {},
			fromTo: '', //从哪个页面点进来
			params:'',//从页面跳转过来带的参数
		}
	}

	// config = {
	//   navigationBarTitleText: "绑定手机号"
	// };

	async componentDidMount() {
		this.fetchAuthorize()
		document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
			// 通过下面这个API隐藏底部导航栏
			WeixinJSBridge.call('hideToolbar');
		});
	}

	fetchAuthorize = async () => {
		const { dispatch } = this.props
		const { code, mobile, state, channel,...rest } = this.$router.params
		if (code && !mobile) {
			let authorize = await dispatch({
				type: 'Auth/callbackAuth',
				payload: { code,channel }
			})
			this.setState({
				authorize_: authorize,
				fromTo: state,
				params: {...rest}
			},() => {
				if (authorize.is_mobile == 1) {
					// Tips.loading("您已绑定过手机号，正在登录...");
					this.setState({ phone: authorize.mobile },() => {
						this.handleLogin()
					})
				} else {
					this.setState({
						isBindPhone: false
					})
				}
			})
		} else {
			if (mobile) {
				Tips.loading('您已绑定过手机号，正在登录...')
				this.setState({ phone: mobile },() => {
					this.handleLogin()
				}
				)
			}
		}
	}

	handleState = (key, value) => {
		this.setState({ [key]: value })
	}

	getCodeByPhone = () => {
		if (this.state.formatPhone) {
			Taro.showToast({
				title: '请输入正确的手机号',
				icon: 'none',
				duration: 2000
			})
			return false
		}
	}

	async handleLogin() {
		const { dispatch, auth_program } = this.props
		let {
			openid,
			nickname,
			sex,
			headimgurl,
			unionid,
			is_mobile
		} = this.state.authorize_
		const { phone, fromTo, params, code, formatCode, isBindPhone } = this.state
		//const from = Platform.authFrom;

		let msg = {
			login_method: 'wx',
			openid,
			nickname,
			sex,
			headimgurl,
			__location: 1,
			type: 'login',
			mobile: phone,
			unionid,
			verify_code: code
		}
		
		if (process.env.TARO_ENV === 'weapp') {
			msg.openid = auth_program.openid
			msg.unionid = auth_program.unionid
			msg.login_method = 'mini'
			is_mobile = auth_program.is_mobile
		}
		if (is_mobile == 1) {
			let {verify_code, mobile,...params } = msg
			msg = params

		}
		if (process.env.TARO_ENV === 'rn') {
			msg.channel = this.$router.params.channel
		}
		if (!isBindPhone && formatCode) {
			Tips.toast(`请输入验证码`);
			return false
		}

		dispatch({
			type: 'loginRegister/fetchLogin',
			payload: msg
		}).then((result) => {
			if (result.is_login === ENUM.LOGINSTATUS) {
				Storage.getInstance().setClauseCheck(true)
				if (fromTo) {
					const paramsStr = utils.getUrlParams(params)
					const url = `${ENUM.FROMURL[fromTo]}${paramsStr}`
					Dq.redirectTo({url})
				} else {
					Dq.redirectTo({
						url: `/pages/home/index`
					})
				}
			}
		})
	}

	render() {
		const base_class = 'login-register'
		const {
			phone,
			errorPhone,
			code,
			errorCode,
			isBindPhone,
			authorize_: { is_mobile }
		} = this.state

		return (
			<View className={`${base_class}`}>
				{!isBindPhone ? (
					<View>
						<View className={`${base_class}__con`}>
							<View className={`${base_class}__con__word2`}>
								<Text className={`${base_class}__con__word2__text`}>绑定手机号</Text>
							</View>
							<LRPhone
								phone={phone}
								isTips="绑定后,即可使用此手机号登录"
								errorType={errorPhone}
								onInput={this.handleState.bind(this, 'phone')}
								onFormatPhone={this.handleState.bind(this, 'formatPhone')}
								onChangeError={this.handleState.bind(this, 'errorPhone')}
							/>
	
							<View>
								<LRCode
									phone={phone}
									code={code}
									getCodeType="login"
									errorType={errorCode}
									onInput={this.handleState.bind(this, "code")}
									onFormatCode={this.handleState.bind(this, "formatCode")}
									onChangeError={this.handleState.bind(this, "errorCode")}
								/>
								<View className={`${base_class}__con__btn`}>
									<DqButton
										label="确认绑定"
										disabled={phone.length <= 0}
										onClick={this.handleLogin.bind(this)}
									/>
								</View>
							</View>
						</View>
					</View>
				) : null}
			</View>
		)
	}
}
export default WxLogin

