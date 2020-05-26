import Taro,{ PureComponent } from '@tarojs/taro'
import { View, TouchableOpacity, Dimensions, Modal, UIManager, findNodeHandle } from 'react-native'
import '../index.scss'
import { ITouchEvent } from '@tarojs/components/types/common'
export interface DropDownMaskProps {
	children?: JSX.Element
	onClick(evt: ITouchEvent): any
	offsetY: number
}
const { height: winHeight } = Dimensions.get('window')
export default function DropDownMask(props: DropDownMaskProps) {
	const { onClick, offsetY } = props
	return (
		<Modal visible onRequestClose={onClick} transparent>
			<TouchableOpacity
				style={{flex: 1}}
				onPress={onClick}
				activeOpacity={1}
			>
				<View className="dropdown dropdown__mask" style={{flex: 1,top:offsetY }}>{props.children}</View>
			</TouchableOpacity>
		</Modal>
	)
}
DropDownMask.defaultProps = {
	offsetY: 0
}
