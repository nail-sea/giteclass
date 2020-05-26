import Taro, { Component } from "@tarojs/taro";
import { Textarea, View } from "@tarojs/components";
import IconFont from "@/components/iconfont";
import FormContext from '../context'
import "../index.scss";
import { stopPropagation } from "@/utils/common";
import { scrollTop } from "@/utils/style";
const BASE = "dq-form";
const TEXTAREA = "dq-form__textarea";
class DqTextarea extends Component {
  static contextType = FormContext
  static defaultProps = {
    placeholderColor: "#999",
    maxlength: 140
  };
  static options = {
    addGlobalClass: true
  }

  onChange = ({ detail: { value } }) => {
    const { onChange , name} = this.props;
    this.context.dispatch({
      type:'change', payload: {name, value}
    })
    onChange && onChange(value);
  };

  onFocus = (e) => {
    const { onFocus } = this.props;
    if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
      e.target && e.target.scrollIntoViewIfNeeded({
        behavior: 'smooth',
        block: 'end'
      })
    }
    onFocus && onFocus();
  };

  onBlur = () => {
    const { onBlur } = this.props;
    scrollTop()
    onBlur && onBlur();
  };

  clear = (e) => {
    stopPropagation(e)
    const { onChange, name} = this.props;
    this.context.dispatch({
      type:'change', payload: {name, value:''}
    })
    onChange && onChange('');
  };

  getValue = () => {
    const {name, value} = this.props
    return (this.context.state || {})[name] || value || ''
  }

  render() {
    const {
      password,
      placeholder,
      placeholderColor,
      disabled,
      maxLength,
      focus,
      confirmType,
    } = this.props;
    const trueValue = this.getValue()
    return (
      <View
        className={`${BASE} ${TEXTAREA}-container`}
      >
        <View className={`${BASE} ${TEXTAREA}__content`}>
          <Textarea
            ref={ref => this.textarea = ref}
            value={trueValue}
            placeholder={placeholder}
            placeholderStyle={`color: ${placeholderColor}`}
            disabled={disabled}
            maxlength={maxLength}
            focus={focus}
            confirmType={confirmType}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onInput={this.onChange}
            onChange={this.onChange}
            className={`${BASE} ${TEXTAREA}`}
            cursorSpacing={200}
          />
          {trueValue ? (
            <View className={`${BASE} ${TEXTAREA}__clear`} onClick={this.clear}>
              <IconFont name="icon_shanmima" size={40} />
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

export default DqTextarea;
