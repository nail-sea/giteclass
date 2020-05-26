import Taro, { Component, useState } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import IconFont from '@/components/iconfont'
import '../index.scss'
const BASE = 'dq-form'
const ITEM = 'dq-form__item'
export default function Arrow(props) {
	const arrowList = [ 'top', 'horizontal', 'bottom' ]
	const { arrow } = props
	const hasArrow = arrowList.includes(arrow)
	return (
		<View className={`${BASE} ${ITEM}__arrow`}>
			{hasArrow ? (
				<View
					className={`${BASE} ${ITEM}__arrow__wrap ${ITEM}__arrow__wrap--${arrow}`}
				>
					<IconFont size={50} color="#c8c8c8" name="ic_zhankai" />
				</View>
			) : null}
		</View>
	)
}
Arrow.options = {
	addGlobalClass: true
}