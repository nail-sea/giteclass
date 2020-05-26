import { StyleSheet, Text,View,TouchableOpacity} from 'react-native'
import { ActionSheet } from '@/components'
import IconFont from '@/components/iconfont'
import { pxToPt } from '@/utils/style'

export default function SharePanel(props) {
	const { show, buttons, onCancel } = props
	return (
		<ActionSheet show={show} onMaskClick={onCancel}>
			<View style={styles.container}>
				<Text style={styles.title}>分享至</Text>
        <View style={styles.content}>
          {buttons.map((button, index) => (
            <TouchableOpacity key={`share-panel-button-${index}`} style={styles.button} activeOpacity={.6} onPress={button.onPress}>
              <View style={styles.buttonWrap}>
                <IconFont name={button.icon} size={85} />
                <Text style={styles.buttonText}>{button.label}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
			</View>
		</ActionSheet>
	)
}
SharePanel.defaultProps = {
	buttons: []
}

const styles = StyleSheet.create({
	container: {
		height: pxToPt('423px'),
		width: '100%',
		backgroundColor: '#fff',
		paddingTop: pxToPt('70px'),
		paddingBottom: pxToPt('90px'),
		alignItems: 'center'
	},
	title: {
		fontSize: pxToPt('32px'),
		color: '#323232',
		fontWeight: '500'
	},
	content: {
    marginTop: pxToPt('70px'),
		width: '100%',
		flexDirection: 'row'
	},
	button: {
		flex: 1,
    alignItems: 'center',
  },
  buttonWrap: {
    alignItems: 'center'
  },
	buttonText: {
		marginTop: pxToPt('48px'),
		fontSize: pxToPt('28px'),
		color: '#424242'
	}
})
