import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { Modal, StyleSheet, findNodeHandle, UIManager } from 'react-native'
import CollapseBar from './components/CollapseBar'
import CollapsePanel from './components/CollapsePanel'
const exampleData = [
	{
		label: '全部分类',
		value: 'class',
		options: [
			{ label: '全部分类', value: 0 },
			{ label: '美食天地', value: 1 },
			{ label: '休闲娱乐', value: 2 },
			{ label: '购物天地', value: 3 },
			{ label: '教育培训', value: 4 },
			{ label: '金融服务', value: 5 }
		],
		defaultValue: 0
	},
	{
		label: '时间',
		value: 'time',
		options: [
			{ label: '全部', value: 0 },
			{ label: '今天', value: 1 },
			{ label: '昨天', value: 2 },
			{ label: '本周', value: 3 },
			{ label: '本月', value: 4 },
			{ label: '本年', value: 5 }
		],
		defaultValue: 0
	},
	{
		label: '地点',
		value: 'place',
		options: [
			{ label: '不限', value: 0 },
			{ label: '1km', value: 1 },
			{ label: '3km', value: 2 },
			{ label: '5km', value: 3 },
			{ label: '10km', value: 4 }
		],
		defaultValue: 0
	},
	{
		label: '排序',
		value: 'order',
		options: [
			{ label: '默认', value: 0 },
			{ label: '浏览量', value: 1 },
			{ label: '销售量', value: 2 }
		],
		defaultValue: 0
	}
]

class RNDqCollapseMenu extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			activeValue: null,
			selectedData: {},
			barTop: 0
		}
  }
  
  _setBarLayout = () => {
    return new Promise((resolve) => {
      const handle = findNodeHandle(this._bar)
      UIManager.measure(handle, (x, y, width, heigh, pageX, pageY) => {
        console.log(pageY)
        this.setState({barTop:pageY}, resolve)
      })

    })
  }

  _closeMenu = () => {
    this.setState({ activeValue: null })
  }

	_onBarChange = (item, active) => {
		if (active) {
      this._setBarLayout().then(() => {
        this.setState({ activeValue: item.value })
      })
		} else {
      this._closeMenu()
		}
	}

	_onBarTopLayout = ({ nativeEvent: { layout } }) => {
		// console.log(layout)
		this.setState({ barTop: layout.y - layout.height })
	}

	_onPanelChange = (value, item, active) => {
		const { selectedData } = this.state
		if (active) {
			selectedData[value] = item.value
		} else {
			delete selectedData[value]
		}
		const { onSelect } = this.props
		onSelect && onSelect(selectedData)
		this.setState({ selectedData: { ...selectedData }, activeValue: null })
	}

	_getIsOpen = () => this.state.activeValue !== null

	render() {
		const { mode, options } = this.props
		const { activeValue, selectedData } = this.state
		return (
			<View className="dq-collapse-menu">
				<Modal visible={this._getIsOpen()} transparent onRequestClose={this._closeMenu}>
					<View style={styles.modal} onClick={this._closeMenu}>
						<View style={{ transform:[{translateY:this.state.barTop}] }}>
              <CollapseBar
                values={selectedData}
                options={options}
                onChange={this._onBarChange}
                activeValue={activeValue}
              />
              <CollapsePanel
                onChange={this._onPanelChange}
                options={options}
                mode={mode}
                activeValue={activeValue}
                values={selectedData}
              />
            </View>
					</View>
				</Modal>
					<CollapseBar
						values={selectedData}
						options={options}
						onChange={this._onBarChange}
            activeValue={activeValue}
            ref={ref => this._bar = ref}
					/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	modal: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,.4)'
	}
})
RNDqCollapseMenu.defaultProps = {
	mode: 'tag',
	options: exampleData,
	multiple: false,
	onSelect: () => {}
}

export default RNDqCollapseMenu
