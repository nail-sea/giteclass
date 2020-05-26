import {View} from '@tarojs/components'
import './index.scss'
const BASE = 'swiper-banner'
const INDICATOR = 'swiper-banner__indicator'
export default function Indicator(props) {
	const { currentIndex, data } = props
	const _getIndicatorClass = (index) => {
		if ((currentIndex % data.length) === index) {
			return `${BASE} ${INDICATOR}__dot ${INDICATOR}__dot--active`
		}
		return `${BASE} ${INDICATOR}__dot`
	}
	return (
		<View className={`${BASE} ${INDICATOR}`}>
			{data && data.map((item, index) => (
				<View
					key={`swiper-banner-indicator-${index}`}
					className={_getIndicatorClass(index)}
				/>
			))}
		</View>
	)
}
Indicator.defaultProps = {
	data:[],
	currentIndex:0,
}
Indicator.options = {
	addGlobalClass:true
}
