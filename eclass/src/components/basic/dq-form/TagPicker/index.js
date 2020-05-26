import Taro, { Component } from '@tarojs/taro'
import { View, Text, CoverView } from '@tarojs/components'
import IconFont from '@/components/iconfont'
import FormContext from '../context'
import * as utils from '../utils'
import '../index.scss'
const BASE = 'dq-form'
const TAG = 'dq-form__tag-picker'
class TagPicker extends Component {
	static defaultProps = {
		defaultLabel: '请选择',
		max: 3
	}
	static contextType = FormContext
	static options = {
		addGlobalClass: true
	}
	state = {
		values: [],
		active: false,
		showMask: false
	}

	componentWillMount() {
		this._setValue(this.props.range, this.props.value)
	}

	componentWillReceiveProps(nextProps) {
		//减少不必要的render开销，条件可以再优化
		if (!utils.isEqual(nextProps.range, this.props.range)) {
			this._setValue(nextProps.range, nextProps.value)
				.then(this.onConfirm)
		}
	}

	_setValue = (range = [], checkedValue = []) => {
		return new Promise(resolve => {
			const newValue = range.map((item) => ({
				...item,
				checked: checkedValue.includes(item.value)
			}))
			this.setState({ values: newValue }, resolve)
		})
	}

	setValue = (value) => {
		this._setValue(this.props.range, value)
			.then(this.onConfirm)
	}

	openMask = () => {
		this.setState({ showMask: true })
	}

	onConfirm = () => {
		const { onChange, name } = this.props
		this.setState({ showMask: false })
		const checkedValue = this.state.values
			.filter((item) => item.checked)
			.map((item) => item.value)
		if (this.context && name) {
			this.context.dispatch({
				type: 'change',
				payload: { name, value: checkedValue }
			})
		}
		onChange && onChange(checkedValue)
	}

	onCancel = () => {
		this.setState({ showMask: false })
		const value = this.getValue()
		this._setValue(this.props.range, value)
	}

	onTouchStart = () => this.setState({ active: true })

	onTouchEnd = () => this.setState({ active: false })

	onItemChange = (index) => {
		const item = this.state.values[index]
		if (item.checked || this.getSelectedCount() < this.props.max) {
			item.checked = !item.checked
			this.setState({ values: [...this.state.values] })
		}
	}

	getValue = () => {
		const { name, value } = this.props
		return (this.context.state || {})[name] || value || []
	}

	getValueText = (value) => {
		const { range = [] } = this.props
		return range
			.filter((item) => value.includes(item.value))
			.map((item) => item.label)
			.join('、')
	}

	getContentClassName = () => {
		const { active } = this.state
		return `${BASE} ${TAG}__content ${active ? `${TAG}__content--active` : ''}`
	}

	getSelectedCount = () =>
		this.state.values.filter((item) => item.checked).length

	renderTag = (item, index) => (
		<CoverView
			key={`tag-item-${index}`}
			className={`${BASE} ${TAG}__mask__content__tag ${item.checked
				? `${TAG}__mask__content__tag--active`
				: ''}`}
			onClick={this.onItemChange.bind(this, index)}
		>
			<CoverView
				className={`${BASE} ${TAG}__mask__content__tag__text ${item.checked
					? `${TAG}__mask__content__tag__text--active`
					: ''}`}
			>
				{item.label}
			</CoverView>
		</CoverView>
	)

	renderMask = () => {
		const { max } = this.props
		const { values } = this.state
		return (
			<CoverView className={`${BASE} ${TAG}__mask`}>
				<CoverView className={`${BASE} ${TAG}__mask__nav`}>
					<CoverView
						className={`${BASE} ${TAG}__mask__nav__left`}
						onClick={this.onCancel}
					>
						<IconFont size={30} name="ic_back" color="#424242"/>
						<CoverView className={`${BASE} ${TAG}__mask__nav__text`}>返回</CoverView>
					</CoverView>
					<CoverView
						className={`${BASE} ${TAG}__mask__nav__text`}
						onClick={this.onConfirm}
					>
						完成
					</CoverView>
				</CoverView>
				<CoverView className={`${BASE} ${TAG}__mask__title`}>
					<CoverView className={`${BASE} ${TAG}__mask__title__text`}>
						{`  最多可选${max}项`}(
					</CoverView>
					<CoverView className={`${BASE} ${TAG}__mask__title__text ${TAG}__mask__title__active`}>
						{this.getSelectedCount()}
					</CoverView>
					<CoverView className={`${BASE} ${TAG}__mask__title__text`}>/{max})</CoverView>
				</CoverView>
				<CoverView className={`${BASE} ${TAG}__mask__content`}>
					{values.map((item, index) => this.renderTag(item, index))}
				</CoverView>
			</CoverView>
		)
	}

	renderText = () => {
		const _value = this.getValue()
		if (_value.length) {
			return (
				<Text className={`${BASE} ${TAG}__content__text`}>
					{this.getValueText(_value)}
				</Text>
			)
		}
		const { defaultLabel } = this.props
		return (
			<Text
				className={`${BASE} ${TAG}__content__text ${TAG}__content__text--default`}
			>
				{defaultLabel}
			</Text>
		)
	}

	render() {
		const { showMask } = this.state
		return (
			<View className={`${BASE} ${TAG}`}>
				{showMask ? this.renderMask() : null}
				<View
					className={this.getContentClassName()}
					onClick={this.openMask}
					onTouchStart={this.onTouchStart}
					onTouchEnd={this.onTouchEnd}
				>
					{this.renderText()}
				</View>
			</View>
		)
	}
}

export default TagPicker
