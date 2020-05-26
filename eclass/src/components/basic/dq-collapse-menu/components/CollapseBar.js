import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import CollapseBarItem from './CollapseBarItem'
import '../index.scss'
class CollapseBar extends PureComponent {
	state = {
		activeValue: null
	}

	_onItemChange = (item, active) => {
    const {onChange} = this.props
    onChange && onChange(item, active)
	}

	_getItemValue = (item) => {
		const { values } = this.props
		return values[item.value] || item.defaultValue
	}

	_getItemActive = (item) => {
		return item.value === this.props.activeValue
	}

	render() {
		const { options } = this.props
		return (
			<View className="dq-collapse-menu__bar">
				{options.map((item, index) => (
					<CollapseBarItem
						data={item}
						value={this._getItemValue(item)}
						onChange={this._onItemChange}
            active={this._getItemActive(item)}
            key={`collapse-menu-bar-panel-item-${index}`}
					/>
				))}
			</View>
		)
	}
}

export default CollapseBar
