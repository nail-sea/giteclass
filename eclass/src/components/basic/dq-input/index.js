import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text, Input, Image } from '@tarojs/components'
import IconFont from "@/components/iconfont";
import { STATIC_ASSETS } from '../../../config'
import './index.scss'

export default class DqInput extends PureComponent {

  static defaultProps = {
    id: '',
    value: '',
    type: 'text',
    autocomplete: 'on',
    password: false,
    placeholder: '',
    placeholderStyle: '',
    placeholderClass: 'dq-input-placeholder',
    disabled: false,
    maxLength: 140,
    confirmType: 'done',
    focus: false,
    styleType: '',
    inputStyle: '',
    icon: 'icon_Shanchumima',
    onInput: () => { },
    onFocus: () => { },
    onBlur: () => { },
    onClear: () => { },
    onGetRefs: () => { }
  }

  handleInput = (e) => {
    const { maxPrice, type } = this.props
    if(maxPrice){
      if(Number(e.detail.value)>=Number(maxPrice)){
        this.props.onInput(maxPrice)
        return;
      }
    }
    if(type == 'number'){
      this.props.onInput(e.detail.value.replace(/[^\d]/g, ""))
      return;
    }
    this.props.onInput(e.detail.value)
  }

  handleClear = () => {
    this.props.onInput('')
    this.props.onClear('')
  }

  render() {
    const {
      id, name, value, autocomplete, type, password, placeholder, placeholderStyle, placeholderClass, disabled, maxLength, confirmType, focus,
      styleType, inputStyle, inputStyleDq,
      onFocus, onBlur,
      icon
    } = this.props

    return (
      <View className='dq-input' style={inputStyleDq}>
        <Input
          autocomplete={autocomplete}
          id={id}
          name={name}
          className={'dq-input__input' + styleType}
          style={inputStyle}
          type={type}
          value={value}
          focus={focus}
          password={password}
          disabled={disabled}
          maxLength={maxLength}
          placeholder={placeholder}
          placeholderClass={placeholderClass}
          confirmType={confirmType}
          onInput={this.handleInput}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {!!value &&
          <View className='dq-input__clear' onClick={this.handleClear}>
            <IconFont name={icon} size={icon==='icon_Shanchumima'?40:30} />
          </View>
        }
      </View>
    )
  }
}
