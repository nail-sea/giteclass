import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { TitleBar ,DqButton} from "@/components";
import { connect } from "@tarojs/redux";
import global from "@/utils/global";
import LRPhone from "../components/phone";
import LRCode from "../components/code";
import Dq from "@/config/Dq";
import "./index.scss";

@connect(({ loginRegister }) => ({
  ...loginRegister
}))
class Service extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      phone: "", //手机号  13111111114  17600709248
      code: "", //验证码
      formatPhone: false, //手机号未通过验证
      formatCode: true, //验证码未通过验证
      errorPhone: "", //手机号错误提示
      errorCode: "" //验证码错误提示
    };
  }

  config = {
    navigationBarTitleText: "绑定新手机号"
  };

  handleState = (key, value) => {
    this.setState({ [key]: value });
  };

  async handleCheck() {
    await this.props.dispatch({
      type: "loginRegister/fetchChangemobile",
      payload: {
        mobile: this.state.phone,
        verify_code: this.state.code,
        type: "change_mobile"
      }
    });
  }

  onChangePhone = () => {
    if (this.state.formatPhone) {
      Taro.showToast({
        title: "请输入正确的手机号",
        icon: "none",
        duration: 2000
      });
    } else if (this.state.formatCode) {
      Taro.showToast({
        title: "请输入验证码",
        icon: "none",
        duration: 2000
      });
    } else {
      Taro.showLoading({
        title: "正在验证..."
      }).then(res => {
        this.handleCheck().then(data => {
          global.userInfo = {};
          setTimeout(() => {
            Taro.hideLoading()
            Dq.redirectTo({
              url: `/pages/user/user`
            });
          }, 1000);
        });
      });
    }
  };

  render() {
    const base_class = "login-register";
    const { phone, code, errorPhone, errorCode } = this.state;
    return (
      <View className={`${base_class}`}>
        <TitleBar title="" />
        <View className={`${base_class}__con`}>
          <View className={`${base_class}__con__word2`}>
            <Text className={`${base_class}__con__word2__text`}>身份验证成功</Text>
          </View>
          <Text className={`${base_class}__con__word4`}>
            更换后，下次可使用当前手机号登录E网
          </Text>
          <LRPhone
            phone={phone}
            errorType={errorPhone}
            onInput={this.handleState.bind(this, "phone")}
            onFormatPhone={this.handleState.bind(this, "formatPhone")}
            onChangeError={this.handleState.bind(this, "errorPhone")}
          />
          <LRCode
            phone={phone}
            code={code}
            getCodeType="change_mobile"
            errorType={errorCode}
            onInput={this.handleState.bind(this, "code")}
            onFormatCode={this.handleState.bind(this, "formatCode")}
            onChangeError={this.handleState.bind(this, "errorCode")}
          />
          <View className={`${base_class}__con__btn`}>
            <DqButton
              label="完成"
              disabled={phone.length <= 0}
              onClick={this.onChangePhone.bind(this)}
            />
          </View>
        </View>
      </View>
    );
  }
}
export default Service;