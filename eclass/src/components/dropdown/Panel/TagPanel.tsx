import { View } from '@tarojs/components'
import '../index.scss'
import PanelItem from './PanelItem'
import { DropDownData, DropDownResult} from '../types'
export interface TagPanelProps {
	activeData: DropDownData
	cols: number
	activeColor: string
	onClick(data: DropDownData, active: boolean): void
	activeKey: string
	value:DropDownResult
}

const BASE = 'dropdown'
const TAG = 'dropdown__panel__tag'
export default function ListPanel(props: TagPanelProps) {
	const { activeData, cols, activeColor, onClick , value, activeKey} = props
	const _getRows = () => Math.ceil(activeData.children.length / cols)
	const _positionToData = (row: number, col: number) => {
		const index = row * cols + col
		return activeData.children[index]
	}
	const _isItemActive = (item) => {
		if (activeData.multiple) {
			return (
				!!value[activeKey] &&
				!!value[activeKey].find((_value) => _value === item.value)
			)
		}
		return value[activeKey] === item.value
	}
	return (
		(!!activeData && <View className={`${BASE} ${BASE}__panel ${TAG}`}>
			{new Array(_getRows()).fill(0).map((o, row) => {
				const innerCols = new Array(cols).fill(0)
				return <View className={`${BASE} ${TAG}__row`}>
					{innerCols.map((o, col) => {
						const data = _positionToData(row, col)
						return (<View className={` ${BASE} ${TAG}__col`} >
							{data && <PanelItem 
								data={data}
								activeColor={activeColor}
								mode={'tag'}
								onClick={onClick}
								active={_isItemActive(data)}
							/>}
						</View>)
					})}
				</View>
			})}
		</View>)
	)
}
ListPanel.defaultProps = {
	activeData:{
		children:[]
	},
	cols: 3
}
