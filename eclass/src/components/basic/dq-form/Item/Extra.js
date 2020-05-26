import Taro, { Component, useState } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import '../index.scss'
const BASE = 'dq-form'
const ITEM = 'dq-form__item'
export default function Extra({ extra }) {
	const isString = typeof extra === 'string'
	return isString ? (
		<View className={`${BASE} ${ITEM}__extra`}>
			<Text className={`${BASE} ${ITEM}__extra__text`}>{extra}</Text>
		</View>
	) : (
		<View className={`${BASE} ${ITEM}__extra`}>{extra}</View>
	)
}
Extra.options ={
	addGlobalClass: true
}