import {
	StyleSheet,
	TouchableOpacity,
	View,
	Text
} from 'react-native'
import IconFont from '@/components/iconfont'
import { pxToPt } from '@/utils/style'
import { ActionSheet } from '@/components'
export default function DisplayActionSheet(props) {
	const { cancelIndex, buttons, onCancel, show } = props
	const cancelButton = buttons[cancelIndex]
	const otherButtons = buttons.filter((button, index) => index !== cancelIndex)
	function onPress(_onPress) {
		return function() {
			onCancel()
			.then(_onPress)
		}
	}
	return (
		<ActionSheet show={show} onMaskClick={onCancel} containerStyle={{backgroundColor:'transparent'}}>
			<View style={showActionSheetStyle.container}>
				{[ ...otherButtons, cancelButton ].map((button, index) => (
					<TouchableOpacity onPress={onPress(button.onPress)} activeOpacity={.6} key={`action-sheet-button-${index}`}>
						<View
							style={[
								showActionSheetStyle.button,
								index === otherButtons.length - 1
									? showActionSheetStyle.buttonEnd
									: null,
								index === otherButtons.length
									? showActionSheetStyle.cancelButton
									: null
							]}
						>
							{button.icon ? <IconFont size={48} name={button.icon} /> : null}
							<Text style={showActionSheetStyle.buttonText}>
								{button.label}
							</Text>
						</View>
					</TouchableOpacity>
				))}
			</View>
		</ActionSheet>
	)
}

const showActionSheetStyle = StyleSheet.create({
	container: {
		backgroundColor: '#f4f4f4',
    borderTopLeftRadius: pxToPt('10px'),
    borderTopRightRadius: pxToPt('10px'),
    overflow: 'hidden'
	},
	button: {
    overflow: 'hidden',
    width: '100%',
		height: pxToPt('100px'),
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		borderBottomColor: '#e9e9e9',
		borderBottomWidth: pxToPt('2px'),
		flexDirection: 'row'
	},
	buttonEnd: {
		borderBottomWidth: 0
	},
	cancelButton: {
		marginTop: pxToPt('22px')
	},
	buttonText: {
		marginLeft: pxToPt('20px'),
		fontSize: pxToPt('32px', true),
		color: '#424242'
	},
	buttonIcon: {
		width: pxToPt('48px'),
		height: pxToPt('48px')
	}
})
