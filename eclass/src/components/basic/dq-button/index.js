import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text, Button ,Form} from '@tarojs/components'
import iconClose from '@/assets/icon/clear.png'
import classNames from 'classnames'
import './index.scss'

export default class _Button extends PureComponent {

  static defaultProps = {
    type: 'default',
    size: '',
    label: '',
    plain: '',
    disabled: false,
    loading: false,
    hoverClass: '',
    hoverStartTime: 20,
    hoverStayTime: 20,
    styleType: '',
    inputStyle: '',
    onClick: () => { }
  }
  onSumit() {
    this.$scope.triggerEvent('submit', arguments[0].detail, {
      bubbles: true,
      composed: true
    });
  }

  render() {
    const {
      type, size, label, plain, disabled, loading, hoverClass, hoverStartTime, hoverStayTime,
      styleType, inputStyle, inputStyleDq, onClick, formType
    } = this.props
    const act_class = disabled ? '--disabled' : ''
    const button = <Button
            className={classNames(`dq-button__btn`, `dq-button__btn${styleType}${act_class}` )}
            style={inputStyle}
            type={type}
            size={size}
            label={label}
            plain={plain}
            loading={loading}
            hoverClass={hoverClass}
            hoverStartTime={hoverStartTime}
            hoverStayTime={hoverStayTime}
            disabled={disabled}
            onClick={onClick}
            formType={formType}
          >
          <Text className={`dq-button__btn${styleType}${act_class}__text`}>{label}</Text>
        </Button>
    return (
      
      <View className={'dq-button' + act_class} style={inputStyleDq}>
        {Taro.getEnv() === Taro.ENV_TYPE.WEAPP && formType ? <Form reportSubmit onSubmit={this.onSumit.bind(this)}>{button}</Form> : button}
      </View>
    )
  }
}
