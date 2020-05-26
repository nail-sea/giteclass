import { View } from '@tarojs/components'
import classnames from 'classnames'
import Thumbnail, { ThumbnailProps } from '../Thumbnail'
import '../index.scss'

const SKELETON = 'skeleton'
const DETAIL = 'skeleton__detail'

export interface DetailProps {
	/**
	 * @description 是否显示骨架屏，默认true
	 */
	loading: boolean
	/**
	 * @description 内容行数，默认10
	 */
	rows?: number
	/**
	 * @description 骨架屏的颜色，默认#f2f2f2
	 */
	color?: string
	/**
	 * @description 上方用户信息的配置信息
	 */
	cardProps?: ThumbnailProps

	children?: JSX.Element
}

export default function Detail(props: DetailProps) {
	if (!props.loading) {
		return <View>{props.children}</View>
	}
	const { rows, cardProps, color } = props
	const {
		color: cardColor = color,
		avatar,
		avatarShape,
		avatarSize,
		rows: cardRows,
		rowStyle,
		height,
		title,
		titleWidth
	} = cardProps
	return (
		<View className={`${SKELETON} ${DETAIL}`}>
			<Thumbnail
				avatar={avatar}
				avatarShape={avatarShape}
				avatarSize={avatarSize}
				rows={cardRows}
				rowStyle={rowStyle}
				height={height}
				title={title}
				titleWidth={titleWidth}
				color={cardColor}
			/>
			<View className={`${SKELETON} ${DETAIL}__content`}>
				{new Array(rows).fill(0).map((o, i) => (
					<View
						key={`skeleton-detail-row-${i}`}
						className={classnames(SKELETON, `${DETAIL}__content__row`, {
							[`${DETAIL}__content__row--first`]: !i
						})}
					/>
				))}
			</View>
		</View>
	)
}

Detail.options = {
	addGlobalClass: true
}
Detail.defaultProps = {
	cardProps: {},
	rows: 20,
	loading: true,
	color: '#f2f2f2'
}
