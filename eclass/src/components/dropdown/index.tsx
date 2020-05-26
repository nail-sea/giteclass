import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { DropDownData, DropDownResult } from './types'
import DropDownBar from './Bar'
import DropDownPanel from './Panel'
export interface DropDownProps {
	height?: number
	data: DropDownData[]
	value: DropDownResult
	mode: 'tag' | 'list'
	activeColor?: string
	onChange?(value: DropDownResult): void
}
const BASE = 'dropdown'
class DropDown extends Component<DropDownProps> {
	static options = {
		addGlobalClass: true
	}
	static defaultProps = {
		data: [],
		value: {},
		activeColor: '#ff9874',
		mode: 'tag'
	}
	state = {
		activeKey: null,
		tempValue: {}
	}

	setActiveKey = (activeKey) => {
		this.setState({ activeKey })
	}

	onPanelItemChange = (tempValue) => this.setState({ tempValue })

	onCancel = () =>
		this.setState({ activeKey: null, tempValue: this.props.value })

	onConfirm = () => {
		const { onChange } = this.props
		const { tempValue } = this.state
		this.setState({ activeKey: null })
		onChange && onChange({ ...tempValue })
	}

	render() {
		const { data, value, mode, activeColor, height } = this.props
		const { activeKey, tempValue } = this.state
		return (
			<View className={`${BASE} ${BASE}__container`}>
				<DropDownBar
					data={data}
					onClick={this.setActiveKey}
					value={value}
					activeKey={activeKey}
					activeColor={activeColor}
					height={height}
				/>
				<DropDownPanel
					data={data}
					value={tempValue}
					activeKey={activeKey}
					mode={mode}
					activeColor={activeColor}
					onMaskClick={this.setActiveKey}
					onChange={this.onPanelItemChange}
					onCancel={this.onCancel}
					onConfirm={this.onConfirm}
				/>
			</View>
		)
	}
}
export default DropDown
