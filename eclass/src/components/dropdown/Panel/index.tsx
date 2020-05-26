import { View, Text } from '@tarojs/components'
import '../index.scss'
import { DropDownResult, DropDownData } from '../types'
import DropDownMask from '../Mask'
import ButtonBar from './ButtonBar'
import TagPanel from './TagPanel'
import utils from '../utils'
export interface DropDownPanelProps {
	mode: 'tag' | 'list'
	activeColor?: string
	value: DropDownResult
	data: DropDownData[]
	activeKey: string
	offsetY: number
	onMaskClick(key: null): void
	onChange(value: DropDownResult): void
	onCancel(): void
	onConfirm(): void
}
const BASE = 'dropdown'
const PANEL = 'dropdown__panel'
export default function DropDownPanel(props: DropDownPanelProps): JSX.Element {
	const {
		mode,
		activeKey,
		activeColor,
		offsetY,
		value,
		data,
		onMaskClick,
		onChange,
		onCancel,
		onConfirm
	} = props

	const _onMaskClick = () => {
		onMaskClick && onMaskClick(null)
	}
	const getActivePanelData = () => data.find((o) => o.value === activeKey)

	const onItemChange = (item: DropDownData, active: boolean) => {
		const activeData = getActivePanelData()
		let newValue = value
		if (active) {
			if (activeData.multiple) {
				newValue[activeKey] = newValue[activeKey].filter(
					(_value) => _value !== item.value
				)
			} else {
				newValue = utils.omit(newValue, [ activeKey ])
			}
		} else {
			if (activeData.multiple) {
				newValue[activeKey] = newValue[activeKey] || []
				newValue[activeKey].push(item.value)
			} else {
				newValue[activeKey] = item.value
			}
		}
		onChange(newValue)
		!activeData.multiple && onConfirm()
	}

	const _stopPropagation = (e) => e && e.stopPropagation && e.stopPropagation()
	const activeData = getActivePanelData()
	const _mode = (() => {
		return (activeData && activeData.mode) || mode
	})()
	return (
		!!activeKey && (
			<DropDownMask offsetY={offsetY} onClick={_onMaskClick}>
				<View className={`${BASE} ${PANEL}`} onClick={_stopPropagation}>
					{_mode === 'tag' && (
						<TagPanel
							activeData={activeData}
							cols={3}
							activeColor={activeColor}
							onClick={onItemChange}
							activeKey={activeKey}
							value={value}
						/>
					)}
					<ButtonBar
						onConfirm={onConfirm}
						onCancel={onCancel}
						show={activeData && activeData.multiple}
					/>
				</View>
			</DropDownMask>
		)
	)
}
DropDownPanel.defaultProps = {
	data: []
}
DropDownPanel.options = {
	addGlobalClass: true
}
