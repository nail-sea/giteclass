import Taro, { PureComponent } from '@tarojs/taro'
import { View , ScrollView} from '@tarojs/components'
import { RefreshControl, Dimensions } from 'react-native'
import './index.scss'
const { height: winHeight } = Dimensions.get('window')
class RNScrollView extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		const { refreshing, onRefresh, style,contentContainerStyle,...scrollViewProps} = this.props
		return (
			<ScrollView
				style={[ { flex: 1}  ]}
				alwaysBounceVertical={false}
				bounce={false}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={[contentContainerStyle]}
				overScrollMode={'never'}
				refreshControl={
					<RefreshControl
						onRefresh={onRefresh}
						refreshing={refreshing}
						colors={[ '#F87C6A' ]}
					/>
				}
				className="scrollview"
				{...scrollViewProps}
			>
				{this.props.children}
			</ScrollView>
		)
	}
}

RNScrollView.defaultProps = {
	refreshing: false,
	onRefresh: () => {},
	onScrollToLower: () => {}
}

export default RNScrollView
