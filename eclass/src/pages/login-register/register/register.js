import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { TitleBar ,DqButton, BasicButton} from "@/components";
import decorator from '@/config/decorator'
// import IconFont from "@/components/iconfont";
// import logoLogin from "@/assets/icon/logo_login.png";
import LRPhone from "../components/phone";
import LRPassword from "../components/password";
import LRCode from "../components/code";
import { connect } from "@tarojs/redux";
import Storage from "@/utils/storage";
import Dq from "@/config/Dq";
import "./register.scss";

@connect(({ loginRegister }) => ({
  ...loginRegister
}))
@decorator()
class Service extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      phone: "", //手机号
      password: "", //密码
      code: "",
      formatPhone: true, //手机号未通过验证
      formatPassword: true, //密码未通过验证
      formatCode: true, //密码未通过验证
      errorPhone: "", //手机号错误提示
      errorPassword: "", //密码错误提示
      errorCode: "",
      loginType: "phone" //登录方式
    };
  }

  // config = {
  //   navigationBarTitleText: "注册"
  // };

  gotoAgreement() {
    Dq.navigateTo({
      url: "/pages/login-register/notice/index"
    });
  }

  handleState = (key, value) => {
    this.setState({ [key]: value });
  };

  async handleLogin() {
    Taro.showLoading({
      title: '正在登录...'
    })
    await this.props
      .dispatch({
        type: "loginRegister/fetchLogin",
        payload: {
          __location: 1,
          mobile: this.state.phone,
          verify_code: this.state.code,
          passwd: this.state.password,
          type: "login",
          login_method: "mobile"
        }
      })
      .then(data => {
        Taro.hideLoading()
        Storage.getInstance().setPassState(this.state.phone.toString(), "yes");
        Taro.switchTab({
          url: `/pages/home/index`
        });
      });
  }

  onRegister = () => {
    if (this.state.formatPhone) {
      Taro.showToast({
        title: "请输入正确的手机号",
        icon: "none",
        duration: 2000
      });
    } else if (this.state.formatCode) {
      Taro.showToast({ title: "请输入验证码", icon: "none", duration: 2000 });
    } else if (this.state.formatPassword) {
      Taro.showToast({ title: "请输入密码", icon: "none", duration: 2000 });
    } else {
      Taro.showLoading({
        title: "正在注册..."
      }).then(res => {
        Taro.hideLoading()
        this.handleLogin();
      });
    }
  };

  onGoLogin = () => {
    Dq.redirectTo({
      url: `/pages/login-register/login/login`
    });
  };

  render() {
    const base_class = "login-register";
    const {
      phone,
      password,
      code,
      errorPhone,
      errorPassword,
      errorCode
    } = this.state;
    return (
      <View className={`${base_class}`}>
        <TitleBar title="" />
        <View className={`${base_class}__con`}>
          <View
            className={`${base_class}__con__word1`}
            onClick={this.onGoLogin.bind(this)}
          >
            <Text className={`${base_class}__con__word1__text`}>登录</Text>
          </View>
          <View className={`${base_class}__con__word2`}>
            <Text className={`${base_class}__con__word2__text`}>
              新用户注册
            </Text>
          </View>
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
            getCodeType="login"
            errorType={errorCode}
            checkRegister={true}
            onInput={this.handleState.bind(this, "code")}
            onFormatCode={this.handleState.bind(this, "formatCode")}
            onChangeError={this.handleState.bind(this, "errorCode")}
          />
          <LRPassword
            password={password}
            errorType={errorPassword}
            onInput={this.handleState.bind(this, "password")}
            onFormatPassword={this.handleState.bind(this, "formatPassword")}
            onChangeError={this.handleState.bind(this, "errorPassword")}
            isShowTips={true}
            tips="6-18位，至少含数字/字母/字符2种组合，请注意区分大小写"
          />

          <View className={`${base_class}__con__btn`}>
            <BasicButton 
              label="注册"
              disabled={phone.length <= 0}
              onClick={this.onRegister}
              size="large"
            />
            {/* <DqButton
              label="注册"
              disabled={phone.length <= 0}
              onClick={this.onRegister.bind(this)}
            /> */}
          </View>

          <View className={`${base_class}__con__clause`}>
            <Text>
              登录代表同意E网
              <Text
                className={`${base_class}__con__clause__word`}
                onClick={this.gotoAgreement.bind(this)}
              >
                《用户协议》
              </Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
export default Service;