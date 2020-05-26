import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { TitleBar } from "@/components";
import classNames from "classnames";
import UserItem from "../components/set-item";
import Tips from "@/utils/tips";
import decorator from "@/config/decorator";
import Dq from "@/config/Dq";
import "./index.scss";

let loginState = 2;
@connect(({ loginRegister }) => ({
  ...loginRegister
}))
@decorator({ needLogin: true })
class AccountManagement extends Component {
  config = {
    navigationBarTitleText: "账户管理"
  };

  constructor() {
    super(...arguments);
    this.state = {};
  }
  handleBack = () => {
    //返回user
    Dq.redirectTo({
      url: "/pages/user/user"
    });
  };
  handleToUserInfo = () => {
    //去个人信息页
    Dq.redirectTo({
      url: "/pages/user/personal-info/index"
    });
  };

  handleToAccountInfo = () => {
    //去账户管理
    Dq.redirectTo({
      url: "/pages/user/account-info/index"
    });
  };

  gotoAgreement() {
    Dq.navigateTo({
      url: "/pages/login-register/notice/index"
    });
  }

  onShowTips = () => {
    Tips.toast(`功能暂未开通`);
  };

  handleLogout = () => {
    //退出登陆
    Taro.showModal({
      title: "",
      content: "确认退出登录吗",
      confirmColor : '#F87C6A',
      success: msg => {
        if (msg.confirm) {
          this.logout();
        }
      }
    });
  };

  async logout() {
    await this.props
      .dispatch({
        type: "loginRegister/fetchLogout"
      })
      .then(data => {
        Dq.redirectTo({
          url: "/pages/home/index"
        });
      });
  }

  render() {
    return (
      <View className="acc_mana">
        <TitleBar
          title="账户管理"
          customBack
          handleBack={this.handleBack.bind(this)}
        />
        <View className="acc_mana__bg-con">
          <UserItem
            titlt="个人信息"
            tips="头像、昵称、出生日期等"
            isBorder
            onhandleClick={this.handleToUserInfo.bind(this)}
          />
          <UserItem
            titlt="账户管理"
            tips="修改密码、修改手机号码、社交账户绑定等"
            isMargin
            onhandleClick={this.handleToAccountInfo.bind(this)}
          />
        </View>
        <View className="acc_mana__bg-con">
          <UserItem titlt="实名认证" isBorder onhandleClick={this.onShowTips} />
          {/* <UserItem titlt="通用" isMargin  onhandleClick={this.onShowTips}/> */}
        </View>
        <View className="acc_mana__bg-con">
          <UserItem titlt="关于E网" isMargin onhandleClick={this.gotoAgreement} />
        </View>
        <View className="acc_mana__bg-con-btn" onClick={this.handleLogout}>
          <Text className="acc_mana__bg-con-btn__text">退出登录</Text>
        </View>
      </View>
    );
  }
}
export default AccountManagement;