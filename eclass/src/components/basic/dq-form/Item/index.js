import Taro, { Component, useState } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Arrow from './Arrow'
import Extra from './Extra'
import '../index.scss'
const BASE = 'dq-form'
const ITEM = 'dq-form__item'
function getItemClassName(mode) {
	return `${BASE} ${ITEM} ${ITEM}--${mode}`
}

function getWrapClassName(mode) {
	return `${BASE} ${ITEM}__wrap ${ITEM}__wrap--${mode}`
}

function getContentClassName(row) {
	return `${BASE} ${ITEM}__content ${row ? `${ITEM}__content--row` : ''}`
}
function getLabelClassName(labelWidth, mode) {
	labelWidth = parseInt(labelWidth)
	labelWidth = Number.isNaN(labelWidth) ? 4 : labelWidth
	labelWidth = Math.min(labelWidth, 7)
	labelWidth = Math.max(labelWidth, 2)
	return `${BASE} ${ITEM}__label ${ITEM}__label--${labelWidth} ${ITEM}__label--${mode}`
}

const requiredList = {'asterisk':'*'}

function Item(props) {
	const defaultProps = {
		label:'',
		extra:null,
		arrow:null,
		required:null,
		hideLabel:false,
		onClick:() => {},
		mode:'default',
		row:false,
		labelWidth:4
	}
	const _props = Object.assign({}, defaultProps, props)
	const {
		label ,
		extra,
		arrow ,
		required,
		hideLabel,
		onClick,
		mode ,
		row ,
		labelWidth
	} = _props
	const [ state, setState ] = useState({ hover: false })
	
	const requiredLabel = required == true ? requiredList['asterisk'] : requiredList[required]||'';
	return (
		<View className={getItemClassName(mode)}>
			<View className={getWrapClassName(mode)} onClick={onClick}>
				{hideLabel ? null : (
					<View className={getLabelClassName(labelWidth, mode)}>
						<Text className={`${BASE} ${ITEM}__label__text`}>{label}</Text>
						{required ? <Text className={`${BASE} ${ITEM}__label__required`}>{requiredLabel}</Text> : null}
					</View>
				)}
				<View className={getContentClassName(row)}>
					{props.children}
				</View>
				{extra ? <Extra extra={extra}/> : null}
				{arrow ? <Arrow arrow={arrow} /> : null}
			</View>
		</View>
	)
}

Item.options = {
	addGlobalClass: true
}


export default Item
