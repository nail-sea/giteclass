import { View } from '@tarojs/components'
import { useState, pxTransform } from '@tarojs/taro'
import Swipe from './Swiper'
import Indicator from './Indicator'
import { formatStyle } from '@/utils/style'
import './index.scss'
import Dq from "@/config/Dq";
export default function SwiperBanner(props) {
	const {
		data,
		style,
		// onClick,
		onChange,
		autoplay,
		loop,
		defaultIndex,
		hideIndicator,
		duration,
	} = props
	const [ currentIndex, setIndex ] = useState(defaultIndex)
	const _style = {width:pxTransform(style.width), height:pxTransform(style.height)}
	const onClick = (item) =>{
		if(item.target_url!=''){
			Dq.navigateTo({
				url: item.target_url
			});
		}
		
	}
	return (
		<View
			className="swiper-banner swiper-banner-container"
			style={_style}
		>
			<Swipe
				data={data}
				style={style}
				onClick={onClick}
				onChange={setIndex}
				autoplay={autoplay}
				loop={loop}
				defaultIndex={defaultIndex}
				currentIndex={currentIndex}
				duration={duration}
			/>
			{!hideIndicator && <Indicator data={data} currentIndex={currentIndex} />}
		</View>
	)
}
SwiperBanner.defaultProps = {
	hideIndicator: false,
	defaultIndex: 0,
	style: { width:'694px', height: '200px' },
	autoplay: true,
	loop: false,
	duration: 3000
}
SwiperBanner.options = {
	addGlobalClass: true
}
