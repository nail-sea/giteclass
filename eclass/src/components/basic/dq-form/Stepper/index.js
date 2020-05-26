'use strict'
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import IconFont from '@/components/iconfont'
import FormContext from '../context'
import '../index.scss'
const BASE = 'dq-form'
const STEPPER = 'dq-form__stepper'
class Stepper extends Component {
	static defaultProps = {
		min: 1,
		max: 99,
		step: 1,
		onChange: () => {}
	}

	static options = {
    addGlobalClass: true
	}
	
	static contextType = FormContext

	componentDidMount() {
		this.initValue()
	}
	
	initValue = () => {
		const {name} = this.props
		const value = this.getValue()
		if (this.context.state && name && this.context.state[name] !== value) {
			this.context.dispatch({
				type:'change',
				payload:{name, value}
			})
		}
		this.setState({value:this.getValue()})
	}

	getValue = () => {
		const { name, min, value } = this.props
		return (this.context.state || {})[name] || value || min
	}

	state = {
		minusActive: false,
		plusActive: false,
	}
	pressCount = 0
	timeout = null

	plus = () => {
		const { max, step, onChange, name } = this.props
		const value = this.getValue()
		if (value < max) {
			const newValue = Math.min(max, value + step)
			this.context.dispatch({
				type: 'change',
				payload: { name, value: newValue }
			})
			onChange && onChange(newValue)
			return true
		}
		return false
	}

	minus = () => {
		const { min, step, onChange, name } = this.props
		const value = this.getValue()
		if (value > min) {
			const newValue = Math.max(min, value - step)
			this.context.dispatch({
				type: 'change',
				payload: { name, value: newValue }
			})
			onChange && onChange(newValue)
			return true
		}
		return false
	}

	getPressDuration = () => {
		if (this.pressCount < 3) {
			return 300
		} else if (this.pressCount < 8) {
			return 200
		} else if (this.pressCount < 15) {
			return 100
		} else if (this.pressCount < 30) {
			return 50
		} else if (this.pressCount < 50) {
			return 20
		} else {
			return 16
		}
	}

	startPlus = () => {
		if (!this.state.plusActive && this.plus()) {
			this.setState({ plusActive: true })
		}
		this.timeout = setTimeout(() => {
			if (this.plus()) {
				this.pressCount++
				this.startPlus()
			}
		}, this.getPressDuration())
	}

	startMinus = () => {
		if (!this.state.minusActive && this.minus()) {
			this.setState({ minusActive: true })
		}
		this.timeout = setTimeout(() => {
			if (this.minus()) {
				this.pressCount++
				this.startMinus()
			}
		}, this.getPressDuration())
	}

	onTouchEnd = () => {
		clearTimeout(this.timeout)
		this.pressCount = 0
		this.setState({ plusActive: false, minusActive: false })
	}

	onInput = ({ detail: { value } }) => {
		const { max, min, onChange, name } = this.props
		value = Number(value)
		value = Math.floor(value)
		value = Math.min(max, value)
		value = Math.max(min, value)
		// this.setState({ value })
		this.context.dispatch({
			type: 'change',
			payload: { name, value }
		})
		onChange && onChange(value)
	}

	getButtonClassName = (active) => {
		return `${BASE} ${STEPPER}__button ${active
			? `${STEPPER}__button--active`
			: ''}`
	}

	render() {
		const { minusActive, plusActive } = this.state
		const trueValue = this.getValue()
		return (
			<View className={`${BASE} ${STEPPER}`}>
				<View
					className={this.getButtonClassName(minusActive)}
					onTouchStart={this.startMinus}
					onTouchEnd={this.onTouchEnd}
				>
					<IconFont name="icon_jian" size={50} />
				</View>
				<View className={`${BASE} ${STEPPER}__content`}>
					<Input
						onInput={this.onInput}
						type="number"
						className={`${BASE} ${STEPPER}__content__text`}
						value={trueValue.toString()}
						// value={2}
					/>
				</View>
				<View
					className={this.getButtonClassName(plusActive)}
					onTouchStart={this.startPlus}
					onTouchEnd={this.onTouchEnd}
				>
					<IconFont name="icon_jia" size={50} />
				</View>
			</View>
		)
	}
}

export default Stepper
