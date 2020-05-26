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
		navigationBarTitleText: '我的邀请码'
	}

	state = {}


	componentDidMount() {
		this.props.dispatch({
			type: "user/fetchGetshareIdentify"
		})
	}

	onToCode() {
		const { identify} = this.props;
		//推荐跳转查看详情
		Dq.navigateTo({
			url: `/pages/share/code/index?identify=${identify}`
		});
	};

	onCopy() {
		const { identify} = this.props;
		Taro.setClipboardData({
			data: `${HOST}/?identify=${identify}&share=3`,
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
			<View className="share-wrap">
				<TitleBar title="我的邀请码" />
				<View className="share-wrap__view" style={{
					height: getWindowHeight(false)
				}}>
					<Image src={STATIC_ASSETS('images/bg/share_bg.png')} className="share-wrap__view__bg" />
					<View className="share-wrap__view__content">
						<Text className="share-wrap__view__title">商铺邀请码</Text>
						<View className="share-wrap__view__code">
							<Text onLongPress={this.onCopy}>{shareAccount}</Text>
						</View>
						
						<View className="share-wrap__view__link" >
							<View className="share-wrap__view__link__titlt">
								<Text className="share-wrap__view__link__titlt__text">H5推广链接及二维码</Text>
								<Text className="share-wrap__view__link__titlt__btn" onClick={this.onToCode.bind(this)}>查看二维码</Text>
							</View>
							<View className="share-wrap__view__link__content">
								<Text className="share-wrap__view__link__content__text" >{`${HOST}/?identify=${identify}&share=3`}</Text>
								<View className="share-wrap__view__link__content__btn" onClick={this.onCopy.bind(this)}>
									<IconFont size={46} name='icon_fuzhilianjie' />
								</View>
							</View>
						</View>

						<View  className="share-wrap__view__mini">
							<Text className="share-wrap__view__mini__text">小程序推广链接</Text>
							<Text className="share-wrap__view__mini__tips">长按下图保存在本地，若需其他物料，请联系客服解决</Text>
							<Image className="share-wrap__view__mini__img" src={mini_programs_qrcode} />
							<Text className="share-wrap__view__mini__tips" style={{textAlign:'center'}}>长按识别小程序码</Text>
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