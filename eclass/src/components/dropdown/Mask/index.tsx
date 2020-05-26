import { View, Text } from '@tarojs/components'
import '../index.scss'
import { ITouchEvent } from '@tarojs/components/types/common'
export interface DropDownMaskProps {
  children?: JSX.Element
  onClick(evt:ITouchEvent):any
}
export default function DropDownMask(props: DropDownMaskProps):JSX.Element {
  const {onClick} = props
	return <View style={{height:'100vh'}} onClick={onClick} className=" dropdown dropdown__mask">{props.children}</View>
}
DropDownMask.options={
  addGlobalClass:true
}