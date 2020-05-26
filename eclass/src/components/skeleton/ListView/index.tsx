import { View } from '@tarojs/components'
import Thumbnail, { ThumbnailProps } from '../Thumbnail'

import '../index.scss'
const SKELETON = 'skeleton'
const LIST = 'skeleton__list'
export interface ListViewProps {
	/**
	 * @description 默认显示几个列表项
	 */
	rows?: number
	/**
	 * @description
	 */
	loading?: boolean
	/**
	 * @description 列表项的配置
	 */
	itemProps?: ThumbnailProps
	children?: JSX.Element
}
export default function ListView(props: ListViewProps) {
	if (!props.loading) {
		return <View>{props.children}</View>
	}

	const { rows, itemProps } = props
	const {
		avatar,
		avatarSize,
		avatarShape,
		color,
		height,
		rows: itemRows,
		rowStyle,
		loading,
		title,
		titleWidth,
		style,
	} = itemProps
	return (
		<View className={`${SKELETON} ${LIST}`}>
			{new Array(rows).fill(0).map((o, i) => (
				<Thumbnail
					key={`skeleton-list-item${i}`}
					avatar={avatar}
					avatarSize={avatarSize}
					avatarShape={avatarShape}
					color={color}
					height={height}
					rows={itemRows}
					rowStyle={rowStyle}
					loading={loading}
					title={title}
					titleWidth={titleWidth}
					style={style}
				/>
			))}
		</View>
	)
}
ListView.options = {
	addGlobalClass: true
}
ListView.defaultProps = {
	rows: 10,
	loading: true,
	itemProps: {}
}
