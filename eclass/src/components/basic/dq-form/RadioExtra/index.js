import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import FormRadio from '../Radio'
import FormPicker from '../Picker'
import FormDatePicker from '../DatePicker'
import FormTagPicker from '../TagPicker'
import FormInput from '../Input'
import FormContext from '../context'
import * as utils from '../utils'
import '../index.scss'

const BASE = 'dq-form'
const EXTRA = 'dq-form__with'

class FormRadioExtra extends Component {
  static contextType = FormContext
  static defaultProps = {
    extraType: 'input',//input, picker, date-picker, tag-picker
    radioProps: {},
    extProps: {},
    radioFlex: 1,
    extraFlex: 1
  }
  static options = {
    addGlobalClass: true
  }

  componentDidMount() {
    this._onChange(this.props.defaultValue)
  }


  _onChange = (value) => {
    const { name, radioProps: { value: radioValue }, extProps: { onInput, onChange } } = this.props
    if (this.context && this.context.dispatch && name) {
      const newValue = utils.isNil(value) ? radioValue : value
      this.context.dispatch({
        type: 'change',
        payload: { name, value: newValue }
      })
    }
    onInput && onInput(value)
    onChange && onChange(value)
  }

  _onRadioChange = (value) => {
    const { name } = this.props
    if (this.context && this.context.dispatch && name) {
      this.context.dispatch({
        type: 'change',
        payload: { name, value }
      })
    }
  }

  _isRadioChecked = () => {
    const { radioProps: { value } } = this.props
    const trueValue = this._getValue()
    return value === trueValue
  }

  _getValue = () => {
    const { value, name } = this.props
    if (this.context && this.context.state && name) {
      return this.context.state[name]
    }
    return value
  }

  _getExtraValue = () => {
    const value = this._getValue()
    const { radioProps: { value: radioValue }, extraType } = this.props
    if (value === radioValue) return extraType === 'input' ? '' : null
    return value
  }

  render() {
    const { radioProps, extProps, extraType, renderDivide, radioFlex, extraFlex } = this.props
    const { label, value: radioValue } = radioProps
    const {
      type,
      password,
      placeholder,
      placeholderColor,
      disabled,
      maxLength,
      focus,
      confirmType,
      onFocus,
      onBlur,
      onCancel,
      extra,
      col,
      multiple,
      range,
      defaultLabel,
      mode,
      fields,
      start,
      end,
      max
    } = extProps
    const _value = this._getExtraValue()
    return (
      <View className={`${BASE} ${EXTRA}`}>
        <View className={BASE} style={{ flex: radioFlex }}></View>
        <FormRadio label={label} value={radioValue} checked={this._isRadioChecked()} onChange={this._onRadioChange} />
        {renderDivide ? renderDivide() : <View className={`${EXTRA}__dividing`} />}
        {extraType === 'input' &&
          <View className={BASE} style={{ flex: extraFlex }}>
            <FormInput
              ref={ref => this.input = ref}
              type={type}
              password={password}
              placeholder={placeholder}
              placeholderColor={placeholderColor}
              disabled={disabled}
              maxLength={maxLength}
              focus={focus}
              confirmType={confirmType}
              onFocus={onFocus}
              onBlur={onBlur}
              extra={extra}
              onInput={this._onChange}
              value={_value}
            />
          </View>}
        {extraType === 'picker' &&
          <View className={BASE} style={{ flex: extraFlex }}>
            <FormPicker
              ref={ref => this.picker = ref}
              col={col}
              multiple={multiple}
              disabled={disabled}
              defaultLabel={defaultLabel}
              range={range}
              onChange={this._onChange}
              onCancel={onCancel}
              value={_value}
            />
          </View>}
        {extraType === 'date-picker' &&
          <View className={BASE} style={{ flex: extraFlex }}>
            <FormDatePicker
              ref={ref => this.datePicker = ref}
              disabled={disabled}
              defaultLabel={defaultLabel}
              mode={mode}
              fields={fields}
              start={start}
              end={end}
              onChange={this._onChange}
              value={_value}
              onCancel={onCancel}
            />
          </View>}
        {extraType === 'tag-picker' &&
          <View className={BASE} style={{ flex: extraFlex }}>
            <FormTagPicker
              ref={ref => this.tagPicker = ref}
              defaultLabel={defaultLabel}
              max={max}
              range={range}
              value={_value}
              onChange={this._onChange}
            />
          </View>}
      </View>
    );
  }
}

export default FormRadioExtra;