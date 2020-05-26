import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, Button } from "@tarojs/components";
import { TitleBar, DqButton, BasicButton} from "@/components";
import { connect } from "@tarojs/redux";
import LRPhone from "../components/phone";
import LRCode from "../components/code";
import LRPassword from "../components/password";
import decorator from "@/config/decorator";
import { STATIC_ASSETS } from "@/config";
import IconFont from "@/components/iconfont";
import Platform from "@/platfrom";
import ENUM from "@/config/enum";
import { getPlatform } from "@/utils/common";
import utils from "@/utils/utils";
import Tips from "@/utils/tips";
import Dq from "@/config/Dq";
import Storage from "@/utils/storage";
import classNames from 'classnames'

import "./login.scss";

@connect(({ Auth, loginRegister }) => ({
  ...loginRegister,
  ...Auth
}))
@decorator()
class Service extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      phone: "", //手机号  18642662530 
      password: "", //密码 test123456
      code: "", //验证码
      formatPhone: true, //手机号未通过验证
      formatPassword: true, //密码未通过验证
      formatCode: true, //密码未通过验证
      errorPhone: "", //手机号错误提示
      errorPassword: "", //密码错误提示
      errorCode: "", //验证码错误提示
      loginType: "mobile", //登录方式
      loginNum: 0,
      initPhone: ""
    };
  }

  config = {
    navigationBarTitleText: "登录"
  };

  gotoAgreement() {
    Dq.navigateTo({
      url: "/pages/login-register/notice/index"
    });
  }

  handleState = (key, value) => {
    this.setState({ [key]: value });
  };

  // async handleLogin(data) {
  //   await this.props.dispatch({
  //     type: "loginRegister/fetchLogin",
  //     payload: data
  //   });
  // }

  onLogin = () => {
    const { phone, password, code, loginType, formatPhone, formatPassword, formatCode, initPhone } = this.state
    if(!formatPhone && ((loginType == "mobile" && !formatCode) || (loginType == "pw" && !formatPassword))){
      Taro.showLoading({
        title: "正在登录..."
      }).then(res => {
        if(initPhone != phone){
          this.setState({initPhone: phone, loginNum: 0})
        }
        let params = {
          __location: 1,
          mobile: phone,
          login_method: loginType,
          type: "login",
        }
        if(loginType == "mobile"){
          params.verify_code = code
        }
        if(loginType == "pw"){
          params.passwd = password
        }
        this.props.dispatch({
          type: "loginRegister/fetchLogin",
          payload: params
        }).then(data => {
          Storage.getInstance().setClauseCheck(true)
          this.setState({initPhone: '', loginNum: 0})
          Taro.hideLoading();
          let passState = (data.is_set_passwd && data.is_set_passwd == "yes") ? data.is_set_passwd : Storage.getInstance().getPassState(phone);
          if (passState == "yes" || loginType == 'pw') {
            Storage.getInstance().setPassState(phone.toString(), "yes");

            const { url } = this.$router.params
            let newUrl = `/pages/home/index`
            
            if(url && ENUM.FROMURL[url]){
              const params = utils.getUrlParams(this.$router.params, true)
              newUrl = ENUM.FROMURL[url] + params
            }
            Dq.redirectTo({
              url: newUrl
            });
          } else {
            Dq.redirectTo({
              url: `/pages/login-register/setpass/setpass?type=login&phone=${phone}`
            });
          }
        }).catch((err) => {
          this.setState(prevState => ({
            loginNum: prevState.loginNum + 1
          }),() => {
            const { loginNum } = this.state
            if (loginNum >= 3) {
              Taro.showModal({
                  title: '',
                  content: '输入多次错误密码，是否找回你的密码？',
                  confirmText: '找回密码',
                  confirmColor : '#F87C6A'
              }).then(res => {
                  if (res.confirm) {
                    Dq.navigateTo({
                        url: `/pages/login-register/verify-identity/index?phone=${phone}`
                    });
                  }
              })
            }
          })
        });
      });
      //   Dq.navigateTo({
      //     url: `/pages/login-register/codeInput/codeInput?phone=${this.state.phone}`
      //   });
    } else if(loginType == "mobile" && formatCode) {
      Tips.toast(`请输入验证码`);
    } else if(loginType == "pw" && formatPassword) {
      Tips.toast(`请输入密码`);
    }
  };

  onGoRegister = () => {
    Dq.redirectTo({
      url: `/pages/login-register/register/register`
    });
  };

  onChangeLogin = () => {
    const type = this.state.loginType == "pw" ? "mobile" : "pw";
    this.setState({ loginType: type, errorPhone: "", errorPassword: "" });
  };

  onFindPassword = () => {
    if (this.state.formatPhone) {
      Taro.showToast({
        title: "请输入正确的手机号",
        icon: "none",
        duration: 2000
      });
      return false;
    }
    Dq.navigateTo({
      url: `/pages/login-register/verify-identity/index?phone=${this.state.phone}`
    });
  };

  async wxLogin() {
    const { url,params } = this.$router.params
    let paramsObj = {}
    if(url==='postId'){
      paramsObj[`post_id`] = params
    }
    if(url === 'shopId'){
      paramsObj[`shop_id`] = params
    }
    Platform.appCheckAuth(url , paramsObj)
  }

  render() {
    const base_class = "login-register";
    const {
      loginType,
      phone,
      password,
      code,
      errorPhone,
      errorPassword,
      errorCode
    } = this.state;
    const isPhone = loginType === "mobile";
    return (
      <View className={`${base_class}`}>
        {/* customBack={true} handleBack={this.handleBack}  */}
        <TitleBar title="" />
        <View className={`${base_class}__con`}>
          {isPhone && (
            <View
              className={`${base_class}__con__word1`}
              onClick={this.onGoRegister.bind(this)}
            >
              <Text className={`${base_class}__con__word1__text`}>注册</Text>
            </View>
          )}
          {/* {isPhone && (
            <View className={`${base_class}__con__logo`}>
              <Image
                className={`${base_class}__con__logo__img`}
                src={STATIC_ASSETS("images/icon/logo_login1.png")}
              />
            </View>
          )} */}
          <View className={classNames(`${base_class}__con__word2`, `${base_class}__con__word2-passload`)}>
            <Text className={`${base_class}__con__word2__text`}>
            {isPhone ? '使用验证码登录' : '使用密码登录'}
            </Text>
          </View>
         
          <LRPhone
            phone={phone}
            isShowTips={false}
            errorType={errorPhone}
            onInput={this.handleState.bind(this, "phone")}
            onFormatPhone={this.handleState.bind(this, "formatPhone")}
            onChangeError={this.handleState.bind(this, "errorPhone")}
          />
          {loginType == "mobile" && (
            <LRCode
              phone={phone}
              code={code}
              getCodeType="login"
              errorType={errorCode}
              onInput={this.handleState.bind(this, "code")}
              onFormatCode={this.handleState.bind(this, "formatCode")}
              onChangeError={this.handleState.bind(this, "errorCode")}
            />
          )}
          {loginType == "pw" && (
            <LRPassword
              password={password}
              errorType={errorPassword}
              onInput={this.handleState.bind(this, "password")}
              onFormatPassword={this.handleState.bind(this, "formatPassword")}
              onChangeError={this.handleState.bind(this, "errorPassword")}
            />
          )}
          {/* {isPhone && (<View className="login__tips">
            <Text className="login__tips__word">未注册的手机号验证后自动创建E网账户</Text>
          </View>)} */}

          <View className={`${base_class}__con__btn`}>
            <BasicButton 
              disabled={phone.length <= 0} 
              onClick={this.onLogin}
              size="large"
              label={isPhone ? "验证码登录" : "登录"}
            >
            </BasicButton>
          </View>

          <View className={`${base_class}__con__word3`}>
            <View onClick={this.onChangeLogin.bind(this)}>
              <Text className={`${base_class}__con__word3__text`}>
                {isPhone ? "密码登录" : "手机号登录"}
              </Text>
            </View>
            {loginType == "pw" && (
              <Text onClick={this.onFindPassword.bind(this)}>忘记密码</Text>
            )}
          </View>

          <View className={`${base_class}__con__clause`}>
            {/* {getPlatform().isWX ? (
              <Button
                className={`${base_class}__con__clause__weapp`}
                openType="getUserInfo"
                onGetUserInfo={this.wxLogin.bind(this)}
              >
                <IconFont name="icon_weixinzhifu" size="80" />
              </Button>
            ) : (
                <View
                  className={`${base_class}__con__clause__h5`}
                  onClick={this.wxLogin.bind(this)}
                >
                  <IconFont name="icon_weixin" size="80" />
                </View>
              )} */}
            {/* <Text>
              登录代表同意E网
              <Text
                className={`${base_class}__con__clause__word`}
                onClick={this.gotoAgreement.bind(this)}
              >
                《用户协议》
              </Text>
            </Text> */}
            {/* <Text className={`${base_class}__con__clause__word`}>《隐私政策》</Text> */}
          </View>
        </View>
      </View>
    );
  }
}
export default Service;
