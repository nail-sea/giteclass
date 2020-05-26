import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text, Textarea, Image } from '@tarojs/components'
import {Platform} from 'react-native'
import './index.scss'
import { STATIC_ASSETS } from '@/config'

export default class DqTextarea extends PureComponent {

  static defaultProps = {
    value: '',
    placeholder: '',
    disabled: false,
    maxLength: 140,
    focus: false,
    styleType: '',
    inputStyle: '',
    onInput: () => { },
    onFocus: () => { },
    onBlur: () => { }
  }

  shouldComponentUpdate(nextProps) {
    const { value, defaultValue } = this.props;
    return Platform.OS !== 'ios'
    || (value === nextProps.value && !nextProps.defaultValue)
    || (defaultValue === nextProps.defaultValue && !nextProps.value);
  }

  handleInput = (e) => {
    this.props.onInput(e.detail.value)
  }

  handleClear = () => {
    this.props.onInput('')
  }

  render() {
    
    const {
      value, placeholder, disabled, maxLength, focus,
      styleType, inputStyle, inputStyleDq,
      onFocus, onBlur, name
    } = this.props

    return (
      <View className='dq-textarea' style={inputStyleDq}>
        <Textarea
          name={name}
          className={'dq-textarea__input' + styleType}
          style={inputStyle}
          value={value}
          focus={focus}
          disabled={disabled}
          maxLength={maxLength}
          placeholder={placeholder}
          onInput={this.handleInput}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {!!value &&
          <View className='dq-textarea__clear' onClick={this.handleClear}>
            <Image className='dq-textarea__clear__img' src={STATIC_ASSETS('images/icon/clear.png')} />
          </View>
        }
      </View>
    )
  }
}
