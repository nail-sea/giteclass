import { Component } from '@tarojs/taro'
import { View, findNodeHandle, UIManager } from 'react-native'
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
		tempValue: {},
		offsetY: 0
	}

	container = null

	setActiveKey = (activeKey) => {
		this.setState({ activeKey })
	}

	onPanelItemChange = (tempValue) => this.setState({ tempValue })

	onBarClick = (activeKey) => {
		this.container.measure((x, y, width, height, pageX, pageY) => {
			this.setState({ offsetY: height + pageY, activeKey })
		})
	}

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
		const { activeKey, tempValue, offsetY } = this.state
		return (
			<View
				collapsable={false}
				className={`${BASE} ${BASE}__container`}
				ref={(ref) => (this.container = ref)}
			>
				<DropDownBar
					data={data}
					onClick={this.onBarClick}
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
					offsetY={offsetY}
				/>
			</View>
		)
	}
}
export default DropDown
