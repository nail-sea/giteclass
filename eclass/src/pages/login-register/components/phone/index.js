import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { FormInput } from "@/components";
import IconFont from "@/components/iconfont";
import "./index.scss";

class LRPhone extends Component {
  constructor() {
    super(...arguments);
    this.state = {};
  }
  static defaultProps = {
    phone: "",
    errorType: "",
    isShowTips: false,
    onInput: () => {},
    onChangeError: () => {},
    onFormatPhone: () => {}
  };

  check = val => {
    if (val.length > 0 && /^[19]{1}[3456789]{1}\d{9}$/.test(val)) {
      this.props.onFormatPhone(false);
    } else if (val == "") {
      this.props.onFormatPhone(true);
    } else {
      this.props.onFormatPhone(true);
    }
  }

  componentDidMount() {
    this.check(this.props.phone)
  }

  handleInput = value => {
    const val = value.replace(/[^\d]/g, "");
    this.props.onChangeError("");
    this.props.onInput(val);
    this.check(val)
  };

  handleBlur = e => {
    const value = e.detail.value.replace(/\s*/g, "");
    if (value.length > 0 && /^[19]{1}[3456789]{1}\d{9}$/.test(value)) {
      this.props.onChangeError("");
    } else if (value == "") {
      this.props.onChangeError("手机号不能为空");
    } else {
      this.props.onChangeError("手机号格式有误");
    }
  };

  render() {
    const base_class = "login-register-phone";
    const { phone, isShowTips, errorType } = this.props;
    const error_class = errorType == "" ? "" : "--error";
    const tips = isShowTips ? "未注册的手机号验证后自动创建E网账户" : "";
    return (
      <View className={`${base_class}`}>
        <View className={`${base_class}__input`}>
          <View className={`${base_class}__input__code`}>
            <Text className={`${base_class}__input__code__text`}>+86</Text>
            <IconFont name="icon_zhankai" color={"#686868"} size={30} />
          </View>
          <FormInput
            placeholder="请输入手机号"
            type="number"
            value={phone}
            maxLength={11}
            styleType="-style2"
            onInput={this.handleInput.bind(this)}
            onBlur={this.handleBlur.bind(this)}
          />
        </View>
        <Text className={`${base_class}__tips${error_class}`}>
          {errorType ? errorType : tips}
        </Text>
      </View>
    );
  }
}
export default LRPhone;