import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { TitleBar, BasicButton } from '@/components'
import { STATIC_ASSETS, HOST } from '@/config';
import IconFont from '@/components/iconfont'
import { connect } from "@tarojs/redux";
import decorator from "@/config/decorator";
import Tips from '@/utils/tips'
import { getWindowHeight } from '@/utils/style'
import Dq from "@/config/Dq";
import './index.scss'


@connect(({ user }) => ({
	...user,
}))
@decorator()
class ShareCode extends Component {

	config = {
		navigationBarTitleText: '招募加盟商'
	}

	state = {}


	componentDidMount() {
		// this.props.dispatch({
		// 	type: "user/fetchGetshareIdentify"
		// })
	}

	handlePhoneCall = (phone) => {
		Taro.makePhoneCall({
		  phoneNumber: phone
		});
	};

	onCopy = (data) => {
		Taro.setClipboardData({
			data: data,
			success: (res) => {
				Taro.getClipboardData({
					success(res) {
						// console.log(res.data) // data
						Tips.toast('复制成功！')
					}
				})
			}
		})
	}

	render() {
		const { shareAccount, mini_programs_qrcode ,identify} = this.props;
		return (
			<View className="service-wrap">
				<TitleBar title="招募加盟商" />
				<View className="service-wrap__view" style={{
					height: getWindowHeight(false)
				}}>
					<Image src={STATIC_ASSETS('images/bg/service_bg.png')} className="service-wrap__view__bg" />
					<View className="service-wrap__view__content">
						<Text className="service-wrap__view__title">联系方式</Text>
						<Text className="service-wrap__view__word">您可拨打电话联系客服，或复制微信号以及微信二维码，进入微信搜索，添加客服，即可在线沟通。</Text>
						{/* <View className="service-wrap__view__code">
							<Text onLongPress={this.onCopy}>{shareAccount}</Text>
						</View> */}
						<View className="service-wrap__view__link" >
							<View className="service-wrap__view__link__titlt">
								<Text className="service-wrap__view__link__titlt__text">客服电话</Text>
								{/* <Text className="service-wrap__view__link__titlt__btn" onClick={this.onToCode.bind(this)}>查看二维码</Text> */}
							</View>
							<View className="service-wrap__view__link__content">
								<Text className="service-wrap__view__link__content__text" >186 7397 8733</Text>
								<View className="service-wrap__view__link__content__btn" onClick={this.handlePhoneCall.bind(this, '18673978733')}>
									<IconFont size={48} name='ic_phone' />
								</View>
							</View>
						</View>
						<View className="service-wrap__view__link" >
							<View className="service-wrap__view__link__titlt">
								<Text className="service-wrap__view__link__titlt__text">微信号</Text>
								{/* <Text className="service-wrap__view__link__titlt__btn" onClick={this.onToCode.bind(this)}>查看二维码</Text> */}
							</View>
							<View className="service-wrap__view__link__content">
								<Text className="service-wrap__view__link__content__text" >186 7397 8733</Text>
								<View className="service-wrap__view__link__content__btn" onClick={this.onCopy.bind(this, '18673978733')}>
									<IconFont size={48} name='icon_fuzhilianjie1' />
								</View>
							</View>
						</View>

						<View  className="service-wrap__view__mini">
							<Text className="service-wrap__view__mini__text">微信二维码</Text>
							<Text className="service-wrap__view__mini__tips">长按下图保存在本地，二维码识别，联系客服。</Text>
							<Image className="service-wrap__view__mini__img" src={STATIC_ASSETS('images/Recruit.jpg')} />
							{/* <Text className="service-wrap__view__mini__tips" style={{textAlign:'center'}}>长按识别小程序码</Text> */}
							{/* <BasicButton  label='分享小程序码' size="large"/> */}
							{/* onClick={onButtonClick} */}
						</View>
						
					</View>
				</View>
				{/* <Barcode text='hello' width={300} height={60} scale={4} />条形码 */}



			</View>
		)
	}
}

export default ShareCode;