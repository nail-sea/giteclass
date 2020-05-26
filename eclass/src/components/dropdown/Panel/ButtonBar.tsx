import { View, Text } from '@tarojs/components'
import '../index.scss'

export interface ButtonBarProps {
	onConfirm(): void
	onCancel(): void
	show: boolean
}
const BASE = 'dropdown'
const BTNS = 'dropdown__panel__btns'
export default function ButtonBar(props: ButtonBarProps) {
	const { onConfirm, onCancel, show } = props
	return (
		show && (
			<View className={`${BASE} ${BTNS}`}>
				<View
					className={`${BASE} ${BTNS}__btn ${BTNS}__btn--cancel`}
					onClick={onCancel}
				>
					<Text
						className={`${BASE} ${BTNS}__btn__text ${BTNS}__btn__text--cancel`}
					>
						取消
					</Text>
				</View>
				<View
					className={`${BASE} ${BTNS}__btn ${BTNS}__btn--confirm`}
					onClick={onConfirm}
				>
					<Text
						className={`${BASE} ${BTNS}__btn__text ${BTNS}__btn__text--confirm`}
					>
						确定
					</Text>
				</View>
			</View>
		)
	)
}
ButtonBar.defaultProps = {
	onConfirm: function() {},
	onCancel: function() {},
	show: false
}
