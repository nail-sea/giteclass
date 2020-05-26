import classnames from 'classnames'
import { View } from '@tarojs/components'
import utils from '../utils'
import '../index.scss'
import { CSSProperties } from 'react'
interface RowStyle {
	width?: number | string
	height?: number | string
}
/**
 * @description 骨架屏缩略图项参数
 * @author aoarashi1988
 * @date 2020-02-17
 */
export interface ThumbnailProps {
	/**
	 * @description 是否显示头像占位图，默认true
	 */
	avatar?: boolean
	/**
	 * @description 头像尺寸，单位像素，默认90
	 */
	avatarSize?: number
	/**
	 * @description 头像形状
	 */
	avatarShape?: 'round' | 'square'
	/**
	 * @description 骨架屏颜色，默认#f2f2f2
	 */
	color?: string
	/**
	 * @description 内容地行数，默认2
	 */
	rows?: number
	/**
	 * 内容每行的样式
	 */
	rowStyle?: RowStyle
	/**
	 * @description 是否在loading中，false则不显示骨架屏
	 */
	loading?: boolean
	/**
	 * @description 高度，单位px，默认100
	 */
	height?: number
	/**
	 * @description 是否显示标题
	 */
	title?: boolean
	/**
	 * @description 标题宽度，可以是像素也可以是百分比
	 */
	titleWidth?: number | string

	style:CSSProperties
	children?: JSX.Element
}
type ViewStyle = {
  width?: number | string
  height?: number | string
  backgroundColor?: string
}
const SKELETON = 'skeleton'
const THUMBNAIL = 'skeleton__thumbnail'
export default function Thumbnail(props: ThumbnailProps) {
	if (!props.loading) {
		return props.children
	}

	const { rows, rowStyle, style, color, height, avatar, avatarShape, avatarSize, title, titleWidth } = props

	const _avatarSize = utils.calcSize(avatarSize)
	
	const getContainerStyle = () => {
		const _style = {}
		const _thumbnailHeight = utils.calcSize(height)
		if (style) {
			Object.entries(style).forEach(([key, value]) =>{
				if (typeof value === 'number') {
					value = utils.calcSize(value)
					_style[key] = value
				}
			})
		}
		return {..._style, height: _thumbnailHeight}
	}

	const getTitleStyle = () =>
		typeof titleWidth === 'string'
			? { width: titleWidth, backgroundColor: color }
			: { width: utils.calcSize(titleWidth), backgroundColor: color }

	const getRowStyle = () => {
		let style:ViewStyle  = {backgroundColor:color, ...rowStyle}
		for (const key in style) {
			if (style.hasOwnProperty(key)) {
				const value = style[key];
				if (typeof value === 'number') {
					style[key] = utils.calcSize(value)
				}
			}
		}
    return style
  }

  const getAvatarStyle = () => ({ width: _avatarSize, height: _avatarSize })
  
	return (
		<View className={`${SKELETON} ${THUMBNAIL}`} style={getContainerStyle()}>
			{avatar && (
				<View
					className={`${SKELETON} ${THUMBNAIL}__avatar ${THUMBNAIL}__avatar--${avatarShape}`}
					style={getAvatarStyle()}
				/>
			)}
			<View className={`${SKELETON} ${THUMBNAIL}__right`}>
				{title && <View className={`${SKELETON} ${THUMBNAIL}__title`} style={getTitleStyle()} />}
				{new Array(rows).fill(0).map((o, i) => (
					<View key={`skeleton-thumbnail-row-${i}`} className={`${SKELETON} ${THUMBNAIL}__row`} style={getRowStyle()} />
				))}
			</View>
		</View>
	)
}

Thumbnail.options = {
	addGlobalClass: true
}

Thumbnail.defaultProps = {
	avatar: true,
	avatarSize: 100,
	avatarShape: 'round',
	color: '#f2f2f2',
	height: 172,
	rows: 2,
	rowStyle: {},
	loading: true,
	title: true,
	titleWidth: '40%',
	style:null
}
