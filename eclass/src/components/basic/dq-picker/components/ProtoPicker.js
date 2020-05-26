import Taro, { PureComponent } from '@tarojs/taro'
import '../index.scss'
class ProtoPicker extends PureComponent {
	static defaultProps = {
		mode: 'selector',
		selector: [],
		classN: '',
		type: 'basic', //basic<普通Picker选择器> ， manu<一列链表选择器>  ， tag<标签选择器>
		title: '',
		select_count: 3,
		isIcon: true,
		value: [], 
		defaultLabel:'请选择',
	}

	constructor(props) {
		super(props)
		this.state = {
			isShowSel: false,
			selList: []
		}
	}
	copyArr = (arr) => {
		if (!arr) {
			arr = []
		}
		const arr1 = []
		arr.forEach((i) => {
			arr1.push(i)
		})
		return arr1
	}

	onChange = (e) => {
		//组件改变事件
		let {detail:{value}} = e
		if (value instanceof Array && value.length > 0 ) {
			value = value.map(item => item === -1? 0: item)
		} else if (value === -1){
			value = 0
		}
		this.props.onChange(value)
	}

	onSelItem = (item, index) => {
		//自定义选择列表 选择每个选项事件
		const arr = this.state.selList
		const i = arr.indexOf(index)
		if (i === -1) {
			if (this.state.selList.length >= this.props.select_count) {
				return
			}
			arr.push(index)
		} else {
			arr.splice(i, 1)
		}
		this.setState({ selList: arr })
	}

	onSelSure = () => {
		//确定事件
		this.props.onChange(this.state.selList)
		this.setState({ isShowSel: false })
	}

	onShowSel = (type) => {
		//自定义选择列表 弹起选择列表
		this.setState({ isShowSel: type })
		if (this.props.type == 'manu' || this.props.type == 'tag') {
			this.setState({ selList: this.copyArr(this.props.value) })
		}
	}
	render() {
		return null
	}
}

export default ProtoPicker
