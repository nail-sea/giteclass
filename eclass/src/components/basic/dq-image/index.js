import Taro, { PureComponent } from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import './index.scss'

export default class DqImage extends PureComponent {
	static defaultProps = {
	}

	state = {
		loaded: false,
		resizeMethod:'scale'
	}

	container = {}
  onLoad = (e) => {
		const nextState = {
			loaded:true
		}
		//仅RN需要做这方面优化
		if (Taro.getEnv() === Taro.ENV_TYPE.RN) {
			const {width, height} = e.detail
			const {width : containerWidth, height: containerHeight} = this.container
			if ((width * height) > (containerWidth * containerHeight * 2)) {
				nextState.resizeMethod = 'resize'
			}
		}
		this.setState(nextState)
	}
  
	onError = () =>{}

	onContainerLayout = ({nativeEvent}) => {
		const {width, height} = nativeEvent.layout
		this.container = {
			width, height
		}
	}
	
	getResizeMode = () => {
		//仅RN需要做这方面优化
	}

	renderBackground = () => <View className="dq-image__background" />

	renderDefaultImage = () => {
		const { defaultSrc, mode } = this.props
		return <Image src={defaultSrc} mode={mode} className="dq-image__default-img" />
	}

	render() {
		const { src, mode, defaultSrc } = this.props
		const { loaded, resizeMethod } = this.state
		return (
			<View className="dq-image" onLayout={this.onContainerLayout}>
				<Image
					mode={mode}
					className="dq-image__img"
					src={src}
					onLoad={this.onLoad}
					onError={this.onError}
					resizeMethod={resizeMethod}
				/>
				{!loaded ? defaultSrc ? (
					this.renderDefaultImage()
				) : (
					this.renderBackground()
				) : null}
			</View>
		)
	}
}
