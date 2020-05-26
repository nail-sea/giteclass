import Taro, { Component } from '@tarojs/taro'
// 引入对应的组件
import { View, Text , Image} from '@tarojs/components'
import { TitleBar, QRCode } from '@/components'
import { HOST } from '@/config';
import { connect } from "@tarojs/redux";
import { STATIC_ASSETS } from "@/config";
import decorator from "@/config/decorator";

import './index.scss'
@connect(({ user }) => ({
	...user,
}))
@decorator()
class Index extends Component {

	config = {
		navigationBarTitleText: '分享'
	}

	state = {
		identify: '',
		imageSrc: '',
	}

	async componentDidMount() {
		this.props.dispatch({
			type: "user/generateqrcode"
		}).then((res) => {
			this.setState({
				imageSrc:res
			})
		})

		const { identify } = this.$router.params
		this.setState({
			identify
		})
	}

	handleBack() {
		Taro.navigateBack({ delta: 1 })
	}

	render() {
		const { identify , imageSrc} = this.state
		const text = `${HOST}?identify=${identify}`//
		console.log(text,'+++++++')

		return (
			<View className='share-wrap__code'>
				<TitleBar title="" />
				<View className="share-wrap__code__bg" >
					<View className="share-wrap__code__bg__view">
						{/* <QRCode
							text={text}
							size={300}
							scale={4}
							errorCorrectLevel='M'
							typeNumber={5}
						/> */}
						<Image className="share-wrap__code__bg__view__img" src={imageSrc} />
						<View className="share-wrap__code__bg__view__text">
							<Text className="share-wrap__code__bg__view__text__text">长按保存二维码</Text>
						</View>
					</View>
				</View>
			</View >
		)
	}
}
export default Index;