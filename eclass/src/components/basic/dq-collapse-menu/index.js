import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
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
			selectedData: {}
		}
	}
  _closeMenu = () => {
    this.setState({ activeValue: null })
  }

	_onBarChange = (item, active) => {
		if (active) {
			this.setState({ activeValue: item.value })
		} else {
      this._closeMenu()
		}
  }

  _onPanelChange = (value, item, active) => {
    const {selectedData} = this.state
    if (active) {
      selectedData[value] = item.value
    } else {
      delete selectedData[value]
    }
    const {onSelect} = this.props
    onSelect && onSelect(selectedData)
    this.setState({selectedData:{...selectedData}, activeValue: null})
  }


  _getIsOpen = () => this.state.activeValue !== null

	render() {
    const { mode, options } = this.props
    const {activeValue, selectedData} = this.state
		return (
			<View className="dq-collapse-menu" style={{overflow:this._getIsOpen()?'visible': 'hidden'}}>
        <View className={`dq-collapse-menu__mask`} style={{display: this._getIsOpen()?'flex':'none' }} onClick={this._closeMenu} />
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
		)
	}
}
RNDqCollapseMenu.defaultProps = {
	mode: 'tag',
	options: [],
	multiple: false,
	onSelect: () => {}
}

export default RNDqCollapseMenu
