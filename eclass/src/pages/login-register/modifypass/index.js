import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { TitleBar ,DqButton} from "@/components";
import global from "@/utils/global";
import LRPassword from "../components/password";
import { connect } from "@tarojs/redux";
import Dq from "@/config/Dq";
import "./index.scss";
@connect(({ loginRegister, user }) => ({
  ...loginRegister,
  ...user
}))
class Service extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      password: "", //密码
      newpassword: "", //密码
      formatPassword: true, //密码未通过验证
      newformatPassword: true, //密码未通过验证
      errorPassword: "", //密码错误提示
      newerrorPassword: "" //密码错误提示
    };
  }
  config = {
    navigationBarTitleText: "设置密码"
  };

  static defaultProps = {
    userInfo: {}
  };

  MyInfo() {
    this.props.dispatch({
      type: "user/fetchMyInfo"
    });
  }

  async componentDidMount() {
    await this.MyInfo();
  }

  handleState = (key, value) => {
    this.setState({ [key]: value });
  };

  async handleModifyPasswd() {
    await this.props
      .dispatch({
        type: "loginRegister/fetchModifyPasswd",
        payload: {
          old_passwd: this.state.password,
          passwd: this.state.newpassword
        }
      })
      .then(data => {
        if (data) {
          global.getInstance().userInfo = {};
          setTimeout(() => {
            Taro.navigateBack({
              delta: 1 // 返回上一级页面。
            });
          }, 1000);
        }
      });
  }

  ModifyPasswd = () => {
    if (this.state.formatPassword) {
      Taro.showToast({
        title: "请输入旧密码",
        icon: "none",
        duration: 2000
      });
    } else if (this.state.newformatPassword) {
      Taro.showToast({
        title: "请输入新密码",
        icon: "none",
        duration: 2000
      });
    } else {
      this.handleModifyPasswd();
    }
  };

  onFindPassword = () => {
    const { userInfo } = this.props;
    Dq.navigateTo({
      url: `/pages/login-register/verify-identity/index?phone=${userInfo.mobile}`
    });
  };

  render() {
    const base_class = "login-register";
    const {
      password,
      newpassword,
      errorPassword,
      newerrorPassword
    } = this.state;
    return (
      <View className={`${base_class}`}>
        <TitleBar title="" />
        <View className={`${base_class}__con`}>
          <View className={`${base_class}__con__word2`}>
            <Text>修改密码</Text>
          </View>
          <LRPassword
            password={password}
            placeholder="请输入旧密码"
            errorType={errorPassword}
            onInput={this.handleState.bind(this, "password")}
            onFormatPassword={this.handleState.bind(this, "formatPassword")}
            onChangeError={this.handleState.bind(this, "errorPassword")}
          />
          <LRPassword
            password={newpassword}
            placeholder="请输入新密码"
            tips="6-18位，至少含数字/字母/字符2种组合，请注意区分大小写"
            isShowTips={true}
            errorType={newerrorPassword}
            onInput={this.handleState.bind(this, "newpassword")}
            onFormatPassword={this.handleState.bind(this, "newformatPassword")}
            onChangeError={this.handleState.bind(this, "newerrorPassword")}
          />
          <View className={`${base_class}__con__btn`}>
            <DqButton
              label="完成"
              disabled={password.length <= 0 || newpassword.length <= 0}
              onClick={this.ModifyPasswd.bind(this)}
            />
          </View>
          <View
            className={`${base_class}__find-pass-user`}
            onClick={this.onFindPassword.bind(this)}
          >
            <Text>
              忘记密码
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
export default Service;