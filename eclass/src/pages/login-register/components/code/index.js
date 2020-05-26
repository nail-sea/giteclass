import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { FormInput, DqCountdown } from "@/components";
import { connect } from "@tarojs/redux";
import Dq from "@/config/Dq";
import Tips from "@/utils/tips";
import "./index.scss";

@connect(({ loginRegister }) => ({
  ...loginRegister
}))
class LRCode extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      type: "get"
    };
  }
  static defaultProps = {
    code: "",
    phone: "",
    errorType: "",
    isShowTips: false,
    getCodeType: "",
    checkRegister: false,
    onInput: () => {},
    onChangeError: () => {},
    onFormatCode: () => {}
  };

  handleInput = value => {
    const val = value.replace(/\s*/g, "");
    this.props.onChangeError("");
    this.props.onInput(val);
    if (val.length > 0) {
      this.props.onFormatCode(false);
    } else if (val == "") {
      this.props.onFormatCode(true);
    }
  };

  handleBlur = e => {
    const value = e.detail.value.replace(/\s*/g, "");
    if (value.length > 0) {
      this.props.onChangeError("");
    } else if (value == "") {
      this.props.onChangeError("验证码不能为空");
    }
  };

  checkRegister = async () => {
    let resdata = await this.props.dispatch({
      type: "loginRegister/fetchCheckisregister",
      payload: {
        mobile: this.props.phone
      }
    })
    if(resdata.is_register == 'yes'){
      let result = await Taro.showModal({ content: "该手机号已被注册，去登录？", confirmColor: '#F87C6A' });
      if(result.confirm){
        Dq.redirectTo({
          url: `/pages/login-register/login/login`
        });
      }
      return true
    }
    return false
  }

  async onGetCode() {
    const { checkRegister, phone } = this.props
    if(checkRegister){
      let res = await this.checkRegister()
      if(res){
        return false
      }
    }
    if(!phone || phone.length <= 0){
      Tips.toast(`请输入手机号`);
      return false
    }
    this.props.onInput("");
    await this.props
      .dispatch({
        type: "loginRegister/fetchGetVerifyCode",
        payload: {
          type: this.props.getCodeType,
          mobile: this.props.phone
        }
      })
      .then(data => {
        if (data) {
          Tips.toast(`验证码已发送，请注意查收`);
          // Taro.showToast({
          //   title: "验证码已发送，请注意查收",
          //   icon: "none",
          //   duration: 3000
          // });
          this.setState({ type: "time" });
        }
      });
  }

  handleTimeEnd = () => {
    this.setState({ type: "getAgain" });
  };

  render() {
    const base_class = "login-register-code";
    const { type } = this.state;
    const { code, isShowTips, errorType } = this.props;
    const error_class = errorType == "" ? "" : "--error";
    const tips = isShowTips ? "请输入6位验证码" : "";
    return (
      <View className={`${base_class}`}>
        <View className={`${base_class}__input`}>
          <FormInput
            placeholder="请输入验证码"
            value={code}
            maxLength={6}
            styleType="-style2"
            onInput={this.handleInput.bind(this)}
            onBlur={this.handleBlur.bind(this)}
          />
          <View className={`${base_class}__input__code`}>
            {type === "get" && (
              <Text
                className={`${base_class}__input__code__get`}
                onClick={this.onGetCode.bind(this)}
              >
                获取验证码
              </Text>
            )}
            {type === "time" && (
              <Text className={`${base_class}__input__code__time`}>
                <DqCountdown
                  seconds={60}
                  timeType="seconds"
                  onTimeEnd={this.handleTimeEnd.bind(this)}
                />
                {/* <Text>后重新获取</Text> */}
              </Text>
            )}
            {type === "getAgain" && (
              <Text
                className={`${base_class}__input__code__get-again`}
                onClick={this.onGetCode.bind(this)}
              >
                再次获取
              </Text>
            )}
          </View>
        </View>
        <Text className={`${base_class}__tips${error_class}`}>
          {errorType ? errorType : tips}
        </Text>
      </View>
    );
  }
}
export default LRCode;