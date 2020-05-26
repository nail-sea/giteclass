import { Component } from '@tarojs/taro'
import { ReactElement } from 'react';
interface RangeItem {
	label: string
	value: any
	children?: RangeItem[]
}
interface RadioProps {
	label: string
	value: string
	onChange?: Function
	checked?: boolean
}
interface InputProps{
  type?:'text'|'password'| 'digit'|'number'|'idcard'
  password?: boolean
  placeholder?: string
  placeholderColor?:string
  disable?: boolean
  maxLength?: number
  focus?: boolean
  confirmType?:'done'|'confirm'|'cancel'|'search'
  onFocus?:Function
	onBlur?:Function
	onInput?:Function
  extra?:string
}
interface PickerProps {
	col?: number
	multiple?: boolean
  disable?: boolean
  defaultLabel?:string
	range: RangeItem[]
	onChange?: Function
	onCancel?: Function
}
interface DatePickerProps {
	disable?: boolean
  defaultLabel?:string
	mode: 'date' | 'time'
	fields: 'year' | 'month' | 'day'
	start: string
	end: string
	onChange?: Function
	onCancel?: Function
}
interface TagPickerProps {
  defaultLabel?:string
  max?:number
	range: RangeItem[]
	onChange?: Function
}
interface FormRadioWithProps {
	value:any
	defaultValue:any
	radioFlex: number
  extraFlex: number
	name:string
	extraType: 'input' | 'picker' | 'date-picker' | 'tag-picker'
  radioProps: RadioProps
	extraProps:InputProps | PickerProps | TagPickerProps | DatePickerProps
	renderDivide?():ReactElement
}
export default class FormRadioWith extends Component <FormRadioWithProps>{}
