import { View, Text } from '@tarojs/components'
import { DropDownData, DropDownResult } from '../types'
import '../index.scss'
export interface PanelItemProps {
	data: DropDownData
	activeColor?: string
	mode: 'tag' | 'list'
	onClick(item:DropDownData, active:boolean): void
	active: boolean
}
const BASE = 'dropdown'
const ITEM = 'dropdown__panel__item'
export default function PanelItem(props: PanelItemProps): JSX.Element {
	const { data, activeColor, mode, onClick, active } = props
	const onItemClick = (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation()
    }
		onClick(data, active)
	}
	const getTextStyle = () => (active ? { color: '#fff' } : {})
	const getItemStyle = () => (active ? { backgroundColor: activeColor } : {})
	return (
		<View className={`${BASE} ${ITEM} ${ITEM}--${mode}`} style={getItemStyle()} onClick={onItemClick}>
			<Text className={`${BASE} ${ITEM}__text`} style={getTextStyle()}>
				{data.label}
			</Text>
		</View>
	)
}
PanelItem.options = {
	addGlobalClass: true
}
