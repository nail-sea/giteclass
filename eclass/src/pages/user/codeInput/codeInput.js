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

  async handleCheck(code) {
    const { phone } = this.$router.params;
    let data = await this.props.dispatch({
      type: "loginRegister/fetchChangemobile",
      payload: {
        mobile: phone,
        verify_code: code,
        type: "verify_mobile"
      }
    });
    if (data) {
      Dq.redirectTo({
        url: `/pages/login-register/change-phone/index`
      });
    }
  }

  render() {
    const { phone } = this.$router.params;
    return (
      <View>
        <TitleBar title="" />
        <CodeInput
          phone={phone}
          fetchType="loginRegister/fetchGetVerifyCode"
          getCodeType="verify_mobile"
          loadTips="正在验证..."
          onNext={this.handleCheck.bind(this)}
        />
      </View>
    );
  }
} 
export default codeInput;