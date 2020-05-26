import Taro, { Component, PureComponent } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
class StickyHeader extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			sticky: false
		}
	}

	componentWillReceiveProps(nextProps) {
		const { stickyScrollY, stickyHeaderY, onStickyChange } = nextProps
		const sticky = stickyScrollY >= stickyHeaderY && stickyHeaderY !== -1
		if (sticky !== this.state.sticky) {
			this.setState({ sticky })
			onStickyChange(sticky)
		}
	}

	_getStyle = () => {
		const { sticky } = this.state
		return sticky
			? {
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0
				}
			: {
					position: 'relative'
				}
	}

	render() {
		return <View style={this._getStyle()}>{this.props.children}</View>
	}
}
StickyHeader.defaultProps = {
	stickyHeaderY: -1,
	stickyScrollY: 0,
	onStickyChange: () => {}
}

export default StickyHeader
