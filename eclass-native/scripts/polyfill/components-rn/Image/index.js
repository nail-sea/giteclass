/**
 * ✔ src
 * ✔ mode: Partial support
 * ✘ lazy-load
 * ✔ onError(binderror)
 * ✔ onLoad(bindload)
 * ✘ onClick
 * ✔ DEFAULT_SIZE
 *
 * @warn Pass require(LOCAL IMAGE) to SRC, otherwise a string-type parameter.
 * @warn The width/height would be undefined in onLoad.
 * @warn Avoid using HTTP source image.
 * @warn Image.resolveAssetSource 会造成重复请求
 * @warn 宽高为 0 的时候，不触发 onLoad，跟小程序不同
 */
import * as React from 'react'
import { Image, StyleSheet } from 'react-native'
import { noop,omit } from '../../utils'
// import ClickableSimplified from '../ClickableSimplified'
import { Mode } from './PropsType'
const resizeModeMap = {
	scaleToFill: 'stretch',
	aspectFit: 'contain',
	aspectFill: 'cover',
	center: 'center'
	// And widthFix
	// Not supported value...
}
class _Image extends React.Component {
	constructor() {
		super(...arguments)
		this.hasLayout = false
		this.state = {
			ratio: 0,
			layoutWidth: 0
		}
		this.onError = () => {
			const { onError = noop } = this.props
			onError({
				detail: { errMsg: 'something wrong' }
			})
		}
		this.onLoad = () => {
			const { src, onLoad } = this.props
			if (!onLoad) return
			if (typeof src === 'string') {
				Image.getSize(
					src,
					(width, height) => {
						onLoad({
							detail: { width, height }
						})
					},
					(err) => {
						onLoad({
							detail: { width: 0, height: 0 }
						})
					}
				)
			} else {
				const iras = Image.resolveAssetSource(
					typeof src === 'string' ? { uri: src } : src
				)
				const { width, height } = iras || { width: 0, height: 0 }
				onLoad({
					detail: { width, height }
				})
			}
		}
		this.onLayout = (event) => {
			const { mode, style } = this.props
			const { width: layoutWidth } = event.nativeEvent.layout
			const flattenStyle = StyleSheet.flatten(style) || {}
			if (mode === 'widthFix' && typeof flattenStyle.width === 'string') {
				if (this.hasLayout) return
				this.setState({
					layoutWidth
				})
			}
			this.hasLayout = true
		}
		this.loadImg = (props) => {
			const { mode, src } = props
			if (mode !== 'widthFix') return
			if (typeof src === 'string') {
				Image.getSize(
					props.src,
					(width, height) => {
						if (this.hasLayout && !!this.state.ratio) return
						this.setState({
							ratio: height / width
						})
					},
					(err) => {}
				)
			} else {
				const source =
					typeof props.src === 'string' ? { uri: props.src } : props.src
				const { width, height } = Image.resolveAssetSource(source) || {}
				if (this.hasLayout) return
				this.setState({
					ratio: height / width
				})
			}
		}
	}
	componentDidMount() {
		this.loadImg(this.props)
	}
	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.src !== this.props.src) {
			this.hasLayout = false
		}
		return true
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.src !== this.props.src) {
			this.loadImg(this.props)
		}
	}
	render() {
		const { style, src, mode } = this.props
		const flattenStyle = StyleSheet.flatten(style) || {}
		// The parameter passed to require mpxTransformust be a string literal
		const source = typeof src === 'string' ? { uri: src } : src
		const isWidthFix = mode === 'widthFix'
		const rMode = resizeModeMap[mode] || (isWidthFix ? undefined : 'stretch')
		const imageHeight = (() => {
			if (isWidthFix) {
				if (typeof flattenStyle.width === 'string') {
					return this.state.layoutWidth * this.state.ratio
				} else if (typeof flattenStyle.width === 'number') {
					return flattenStyle.width * this.state.ratio
				} else {
					return 300 * this.state.ratio
				}
			} else {
				return flattenStyle.height || 225
			}
		})()
    const restImageProps = omit(this.props, ['source', 'src', 'resizeMode', 'onLoad', 'onError', 'onLayout', 'style'])
		return React.createElement(Image, {
			source: source,
			resizeMode: rMode,
			onError: this.onError,
			onLoad: this.onLoad,
			onLayout: this.onLayout,
			style: [
				{
					width: 300
				},
				style,
				{
					height: imageHeight
				}
			],
			...restImageProps
		})
	}
}
_Image.defaultProps = {
	src: '',
	mode: Mode.ScaleToFill
}
// export { _Image }
// export default ClickableSimplified(_Image)
export default _Image
