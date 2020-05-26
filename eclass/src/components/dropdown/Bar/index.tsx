import { View } from "@tarojs/components";
import {DropDownData, DropDownResult} from '../types'
import utils from '../utils'
import '../index.scss'
import DropDownBarItem from "./BarItem";
export interface DropDownBarProps {
  data:DropDownData[]
  value:DropDownResult
  onClick(key:string):void
  activeKey:string | number
  activeColor?: string
  height?:number | string
}
const BASE = 'dropdown'
const BAR = 'dropdown__bar'
export default function DropDownBar(props: DropDownBarProps):JSX.Element {
  const {data, value, onClick, activeKey, activeColor, height} = props
  const getBarStyle = () => {
    return height?{height:utils.calcSize(height)}:{}
  }
  return (
    <View 
      className={`${BASE} ${BAR}`} 
      style={getBarStyle()}
    >
      {data.map((o, i) => <DropDownBarItem 
        key={`dropdown-bar-item${i}`} 
        data={o} 
        value={value}
        onClick={onClick}
        active={activeKey === o.value}
        activeColor={activeColor}
      />)}
    </View>
  )
}
DropDownBar.defaultProps = {
  data:[]
}
DropDownBar.options = {
  addGlobalClass:true
}