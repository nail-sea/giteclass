import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { TitleBar ,DqButton} from "@/components";
import LRPassword from "../components/password";
import { connect } from "@tarojs/redux";
import Storage from "@/utils/storage";
import Dq from "@/config/Dq";
import "./setpass.scss";
@connect(({ loginRegister }) => ({
  ...loginRegister
}))
class Service extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      password: "", //密码
      formatPassword: true, //密码未通过验证
      errorPassword: "" //密码错误提示
    };
  }

  config = {
    navigationBarTitleText: "设置密码"
  };

  handleState = (key, value) => {
    this.setState({ [key]: value });
  };

  async handleModifyPasswd() {
    //设置密码
    await this.props
      .dispatch({
        type: "loginRegister/fetchModifyPasswd",
        payload: {
          passwd: this.state.password
        }
      })
      .then(data => {
        const { type } = this.$router.params;
        let url =
          type && type == "set" ? "/pages/user/user" : "/pages/home/index";
        Dq.redirectTo({
          url: url
        });
      });
  }

  async handlefindPasswd() {
    //忘记密码
    const { phone, code } = this.$router.params;
    let data = await this.props.dispatch({
      type: "loginRegister/fetchForgotpasswd",
      payload: {
        mobile: phone,
        passwd: this.state.password,
        type: "set_passwd",
        verify_code: code
      }
    });
    if (data) {
      Taro.showLoading({
        title: "正在登录..."
      }).then(res => {
        this.handleLogin({
          __location: 1,
          mobile: phone,
          passwd: this.state.password,
          login_method: "pw"
        });
      });
    }
  }

  async handleLogin(data) {
    let result = await this.props.dispatch({
      type: "loginRegister/fetchLogin",
      payload: data
    });
    if (result) {
      Taro.hideLoading()
      Taro.switchTab({
        url: `/pages/home/index`
      });
    }
  }

  ModifyPasswd = () => {
    const { type } = this.$router.params;
    if (this.state.formatPassword) {
      Taro.showToast({
        title: "请输入密码",
        icon: "none",
        duration: 2000
      });
    } else {
      if (type == "find") {
        this.handlefindPasswd();
      } else {
        this.handleModifyPasswd();
      }
    }
  };

  onJump = () => {
    const { phone } = this.$router.params;
    Storage.getInstance().setPassState(phone.toString(), "yes");
    Taro.switchTab({
      url: `/pages/home/index`
    });
  };

  render() {
    const base_class = "login-register";
    const { password, errorPassword } = this.state;
    const { type } = this.$router.params;
    return (
      <View className={`${base_class}`}>
        <TitleBar title="" />
        <View className={`${base_class}__con`}>
          {type == "login" && (
            <View
              className={`${base_class}__con__word1`}
              onClick={this.onJump.bind(this)}
            >
              暂不设置，跳过
            </View>
          )}
          <View className={`${base_class}__con__word2`}>
            <Text>设置密码</Text>
          </View>
          <LRPassword
            password={password}
            tips="6-18位，至少含数字/字母/字符2种组合，请注意区分大小写"
            isShowTips={true}
            errorType={errorPassword}
            onInput={this.handleState.bind(this, "password")}
            onFormatPassword={this.handleState.bind(this, "formatPassword")}
            onChangeError={this.handleState.bind(this, "errorPassword")}
          />
          <View className={`${base_class}__con__btn`}>
            <DqButton
              label="完成"
              disabled={password.length <= 0}
              onClick={this.ModifyPasswd.bind(this)}
            />
          </View>
        </View>
      </View>
    );
  }
}
export default Service;