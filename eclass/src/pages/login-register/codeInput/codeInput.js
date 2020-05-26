import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { TitleBar, CodeInput } from "@/components";
import { connect } from "@tarojs/redux";
import Storage from "@/utils/storage";
import Dq from "@/config/Dq";
import "./codeInput.scss";

@connect(({ loginRegister }) => ({
  ...loginRegister
}))
class codeInput extends Component {
  constructor() {
    super(...arguments);
    this.state = {};
  }

  config = {
    navigationBarTitleText: "输入验证码"
  };

  async handleLogin(code) {
    const { phone } = this.$router.params;
    await this.props
      .dispatch({
        type: "loginRegister/fetchLogin",
        payload: {
          __location: 1,
          mobile: phone,
          verify_code: code,
          type: "login",
          login_method: "mobile"
        }
      })
      .then(data => {
        let passState =
          data.is_set_passwd == "yes"
            ? data.is_set_passwd
            : Storage.getInstance().getPassState(phone);
        if (passState == "yes") {
          Storage.getInstance().setPassState(phone.toString(), "yes");
          Dq.redirectTo({
            url: `/pages/home/index`
          });
        } else {
          // Storage.getInstance().setPassState("");
          Dq.redirectTo({
            url: `/pages/login-register/setpass/setpass?type=login&phone=${phone}`
          });
        }
      });
  }

  render() {
    const { phone } = this.$router.params;
    return (
      <View className="login-code-input">
        <TitleBar title="" />
        <CodeInput
          phone={phone}
          fetchType="loginRegister/fetchGetVerifyCode"
          getCodeType="login"
          loadTips="正在登录..."
          onNext={this.handleLogin.bind(this)}
        />
      </View>
    );
  }
}
export default codeInput;