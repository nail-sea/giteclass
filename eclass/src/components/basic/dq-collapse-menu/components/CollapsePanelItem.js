import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import '../index.scss'
class CollapsePanelTagItem extends PureComponent {
  _onClick = () => {
    const { active, data,  onChange} = this.props
    onChange && onChange(data, !active)
  }
	render() {
		const { active, data, mode } = this.props
		return (
			<View className={`dq-collapse-menu__panel__item--${mode}--${active ? 'active' : 'inactive'}`} onClick={this._onClick}>
				<Text
					className={`dq-collapse-menu__panel__item--${mode}--${active
						? 'active'
						: 'inactive'}__text`}
				>
					{data.label}
				</Text>
			</View>
		)
	}
}

export default CollapsePanelTagItem
