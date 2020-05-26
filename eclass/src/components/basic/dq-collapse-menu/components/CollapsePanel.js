import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import '../index.scss'
import CollapsePanelItem from './CollapsePanelItem'
class CollapsePanel extends PureComponent {
	_onItemChange = (item, active) => {
		const { onChange, activeValue } = this.props
		onChange && onChange(activeValue, item, active)
	}

	_getItemActive = (item) => {
		const { values, activeValue } = this.props
		return values[activeValue] === item.value
	}

	_getSections = () => {
		const { activeValue, options } = this.props
		const activeOptions = options.find((item) => item.value === activeValue)
		return (activeOptions && activeOptions.options) || []
	}

	_isShow = () => this.props.activeValue !== null

	_renderItem = (item, index) => {
		const modeList = [ 'tag', 'list' ]
		const { mode } = this.props
		return modeList.includes(mode) ? (
			<CollapsePanelItem
        mode={mode}
				data={item}
				active={this._getItemActive(item)}
				onChange={this._onItemChange}
			/>
		) : (
			<View />
		)
	}

	render() {
		const { mode, show } = this.props
		return (
			<View
				className={`dq-collapse-menu__panel--${mode}`}
			>
				{this._getSections().map(this._renderItem)}
			</View>
		)
	}
}

export default CollapsePanel
