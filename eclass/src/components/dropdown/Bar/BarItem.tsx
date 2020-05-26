import { View, Text } from "@tarojs/components";
import IconFont from '@/components/iconfont'
import { DropDownData, DropDownResult } from "../types";
import utils from '../utils'
import '../index.scss'
import './index.scss'
export interface DropDownBarItemProps{
  data:DropDownData
  activeColor?:string
  value:DropDownResult
  active:boolean
  onClick(key:string):void
}
const BASE = 'dropdown'
const ITEM = 'dropdown__bar__item'
export default function DropDownBarItem(props:DropDownBarItemProps):JSX.Element {
  const {data, activeColor, value, active, onClick} = props
  const onItemClick = () => {
    const param = active? null: data.value
    onClick && onClick(param)
  }
  const getValue = () => value[data.value]
  const isTextActive = (() => {
    const {defaultValue} = data
    const currentValue = getValue()
    return active || !!currentValue  && currentValue !== defaultValue
  })()
  const getTextStyle = () => ({color:isTextActive? activeColor: null})
  const getShowLabel = () => {
    const {defaultValue} = data
    const currentValue = getValue()
    if (currentValue === defaultValue || utils.isNil(currentValue)) return data.label
    if (data.multiple) {
      return currentValue.map(_value => data.children.find(o => o.value === _value).label).toString()
    }
    return data.children.find(o => o.value === currentValue).label
  }
  return (
    <View className={`${BASE} ${ITEM}`} onClick={onItemClick}>
      <Text numberOfLines={1} className={`${BASE} ${ITEM}__text`} style={getTextStyle()}>
        {getShowLabel()}
      </Text>
      <IconFont 
        name={active?'icon_shouqi':'icon_zhankai'}
        color={isTextActive? activeColor: '#747474'}
        size={34}
      />
    </View>
  )
}
DropDownBarItem.defaultProps = {
  data:{},
  value:{}
}
DropDownBarItem.options = {
  addGlobalClass:true
}